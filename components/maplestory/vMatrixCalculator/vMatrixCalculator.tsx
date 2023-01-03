import { useEffect, useState } from "react";
import CoreStackList from "./coreStackList";
import { CoreStackListType } from "../../../constants/types";
import SelectJob from "./selectJob";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";
import MyCoreGenerator from "./myCoreGenerator";
import MyCoreList from "./myCoreList";
import { Box, Button, TextField } from "@mui/material";
import Popup from "../../popup";
import { jobList } from "../../../pages/v_matrix_calculator";

export default function VMatrixCalculator() {
  const [job, setJob] = useState<string>(
    localStorage.getItem(COOKIE_PREFIX_V_MATRIX_CALCULATOR + "job") ?? ""
  );
  const [slotCount, setSlotCount] = useState<number>(0);
  const [coreStackList, setCoreStackList] = useState<CoreStackListType>({});
  const [myCoreList, setMyCoreList] = useState<string[][]>([]);

  // 사용할 코어 개수 로드
  useEffect(
    () =>
      setSlotCount(
        Number(
          localStorage.getItem(
            COOKIE_PREFIX_V_MATRIX_CALCULATOR + "slot_count"
          ) ?? 1
        )
      ),
    []
  );
  useEffect(() => {
    if (slotCount) {
      localStorage.setItem(
        COOKIE_PREFIX_V_MATRIX_CALCULATOR + "slot_count",
        String(slotCount)
      );
    }
  }, [slotCount]);

  return (
    <>
      <Box display={"flex"} flexDirection={"row"} gap={1}>
        <SelectJob job={job} setJob={setJob} />
        <TextField
          type={"number"}
          inputMode={"numeric"}
          label={"최대 코어 수"}
          value={slotCount ?? ""}
          onChange={e =>
            Number(e.target.value) > 0 && setSlotCount(Number(e.target.value))
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
      <Button
        variant={"contained"}
        color={"secondary"}
        sx={{ flex: 0 }}
        onClick={() =>
          console.log(coreCalc(coreStackList, myCoreList, slotCount))
        }
      >
        계산
      </Button>
    </>
  );
}

function coreCalc(
  coreStackList: CoreStackListType,
  myCoreList: string[][],
  coreCount: number,
  resultCoreList: string[][] = [],
  currDepth: number = 1
): string[][] | false {
  const core = myCoreList.shift();
  if (core) {
    resultCoreList.push(core);
    resultCoreList.forEach(_ => _.forEach(__ => coreStackList[__]--));
    const success = !Object.values(coreStackList).find(_ => _ > 0);
    if (success) {
      return resultCoreList;
    } else if (currDepth < coreCount) {
      return coreCalc(
        coreStackList,
        myCoreList.filter(_ => _[0] !== core[0]),
        coreCount,
        resultCoreList,
        currDepth + 1
      );
    } else {
      return false;
    }
  } else {
    return resultCoreList;
  }
}
