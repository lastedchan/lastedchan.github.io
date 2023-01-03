import { useEffect, useMemo, useState } from "react";
import CoreStackList from "./coreStackList";
import { CoreStackListType } from "../../../constants/types";
import SelectJob from "./selectJob";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";
import MyCoreGenerator from "./myCoreGenerator";
import MyCoreList from "./myCoreList";
import {
  Box,
  Button,
  Card,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import Popup from "../../popup";
import { jobList } from "../../../../pages/v_matrix_calculator";
import { sum } from "lodash";
import styled from "@emotion/styled";

export default function VMatrixCalculator() {
  const [job, setJob] = useState<string>(
    localStorage.getItem(COOKIE_PREFIX_V_MATRIX_CALCULATOR + "job") ?? ""
  );
  const [coreStackList, setCoreStackList] = useState<CoreStackListType>({});
  const [maxCoreCount, setMaxCoreCount] = useState<number>(0);
  const [myCoreList, setMyCoreList] = useState<string[][]>([]);
  const [result, setResult] = useState<string[][]>([]);
  const [resultOpen, setResultOpen] = useState<boolean>(false);

  const minCoreCount = useMemo(
    () => Math.ceil(sum(Object.values(coreStackList)) / 3),
    [coreStackList]
  );

  //#region 사용할 코어 개수
  useEffect(
    () =>
      setMaxCoreCount(
        Number(
          localStorage.getItem(
            COOKIE_PREFIX_V_MATRIX_CALCULATOR + "slot_count"
          ) ?? 1
        )
      ),
    []
  );
  useEffect(() => {
    if (maxCoreCount) {
      localStorage.setItem(
        COOKIE_PREFIX_V_MATRIX_CALCULATOR + "slot_count",
        String(maxCoreCount)
      );
    }
  }, [maxCoreCount]);
  //#endregion

  //#region 중첩 코어 횟수 로드
  useEffect(() => {
    if (!job.length) return;
    const stacks = JSON.parse(
      localStorage.getItem(
        COOKIE_PREFIX_V_MATRIX_CALCULATOR + "core_stack_" + job
      ) ?? "[]"
    );
    setCoreStackList(
      jobList[job]?.reduce((prev: { [p: string]: number }, item) => {
        prev[item] = stacks?.[item] ?? 0;
        return prev;
      }, {}) ?? {}
    );
  }, [job, setCoreStackList]);
  //#endregion

  useEffect(
    () => setMaxCoreCount(prev => Math.max(prev, minCoreCount)),
    [minCoreCount]
  );

  return (
    <>
      <Box display={"flex"} flexDirection={"row"} gap={1}>
        <SelectJob job={job} setJob={setJob} />
        <TextField
          type={"number"}
          inputMode={"numeric"}
          label={"최대 코어 수"}
          value={maxCoreCount ?? ""}
          onChange={e =>
            Number(e.target.value) >= minCoreCount &&
            setMaxCoreCount(Number(e.target.value))
          }
          sx={{ flex: "0 0 120px", input: { textAlign: "right" } }}
        />
      </Box>
      <Popup title={job + " 코어 중첩 설정"}>
        <CoreStackList
          job={job}
          coreStackList={coreStackList}
          setCoreStackList={setCoreStackList}
        />
      </Popup>
      <MyCoreGenerator
        coreList={jobList[job] ?? []}
        setMyCoreList={setMyCoreList}
      />
      <MyCoreList
        job={job}
        myCoreList={myCoreList}
        setMyCoreList={setMyCoreList}
      />
      <Dialog open={resultOpen} onClose={() => setResultOpen(false)}>
        <ResultContainer>
          {result.map((skills, i) => (
            <ResultWrapper key={i}>
              <Item>
                {skills.map(_ => (
                  <Typography key={_}>{_}</Typography>
                ))}
              </Item>
            </ResultWrapper>
          ))}
        </ResultContainer>
      </Dialog>
      <Button
        variant={"contained"}
        color={"secondary"}
        sx={{ flex: 0 }}
        onClick={() => {
          setResult(
            coreCalc(
              { ...coreStackList },
              [...myCoreList],
              minCoreCount,
              maxCoreCount
            ) ?? []
          );
          setResultOpen(true);
        }}
      >
        계산
      </Button>
    </>
  );
}

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
`;

const ResultWrapper = styled.div`
  flex: 0 0 50%;
  padding: 4px;
  overflow: hidden;
`;

const Item = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  justify-content: center;
  & p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

function coreCalc(
  coreStackList: CoreStackListType,
  myCoreList: string[][],
  minCoreCount: number,
  maxCoreCount: number
): string[][] | null {
  let result: string[][] | null = null;
  for (let i = minCoreCount; i <= maxCoreCount; i++) {
    const res = _coreCalc({ ...coreStackList }, [...myCoreList], i);
    if (res && res.length === i) {
      result = res;
      break;
    }
  }
  return result;
}

function _coreCalc(
  coreStackList: CoreStackListType,
  myCoreList: string[][],
  coreCount: number,
  resultCoreList: string[][] = []
): string[][] | false | null {
  let depth = resultCoreList.length;
  const coreStackList2 = { ...coreStackList };
  const myCoreList2 = [...myCoreList];

  const core = myCoreList2.shift();

  if (core) {
    // 코어 있음
    core.forEach(_ => (coreStackList2[_] -= 1));
    if (!Object.values(coreStackList2).find(_ => _ > 0)) {
      // 조건 만족
      return [...resultCoreList, core];
    } else if (depth < coreCount - 1) {
      // 아직 코어를 더 넣을 수 있음
      let result: string[][] | false | null = false;
      const myCoreList3 = myCoreList2.filter(_ => _[0] !== core[0]);
      do {
        result = _coreCalc(coreStackList2, myCoreList3, coreCount, [
          ...resultCoreList,
          core,
        ]);
      } while (result === false);
      if (result) {
        return result;
      } else {
        return _coreCalc(coreStackList, myCoreList2, coreCount, resultCoreList);
      }
    } else {
      // 코어 자리 없음
      myCoreList.shift();
      return false;
    }
  } else {
    // 코어 없음
    return null;
  }
}
