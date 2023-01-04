import { useEffect, useState } from "react";
import CoreStackList from "./coreStackList";
import { stackListType } from "../../../constants/types";
import SelectJob from "./selectJob";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";
import MyCoreGenerator from "./myCoreGenerator";
import MyCoreList from "./myCoreList";
import { Box, TextField } from "@mui/material";
import Popup from "../../popup";
import { jobList } from "../../../../pages/v_matrix_calculator";
import Calculator from "./calculator";
import { sum } from "lodash";

export default function VMatrixCalculator() {
  const [job, setJob] = useState<string>(
    localStorage.getItem(COOKIE_PREFIX_V_MATRIX_CALCULATOR + "job") ?? ""
  );
  const [coreStackList, setCoreStackList] = useState<stackListType>({});
  const [coreCount, setCoreCount] = useState<number>(0);
  const [myCoreList, setMyCoreList] = useState<string[][]>([]);

  //#region 사용할 코어 개수
  useEffect(
    () =>
      setCoreCount(
        Number(
          localStorage.getItem(
            COOKIE_PREFIX_V_MATRIX_CALCULATOR + "slot_count"
          ) ?? 1
        )
      ),
    []
  );
  useEffect(() => {
    if (coreCount) {
      localStorage.setItem(
        COOKIE_PREFIX_V_MATRIX_CALCULATOR + "slot_count",
        String(coreCount)
      );
    }
  }, [coreCount]);
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
    () => setCoreCount(Math.ceil(sum(Object.values(coreStackList)) / 3)),
    [coreStackList]
  );

  return (
    <>
      <Box display={"flex"} flexDirection={"row"} gap={1}>
        <SelectJob job={job} setJob={setJob} />
        <TextField
          type={"number"}
          inputMode={"numeric"}
          label={"코어 수"}
          value={coreCount ?? ""}
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
      <Calculator
        coreStackList={coreStackList}
        myCoreList={myCoreList}
        coreCount={coreCount}
      />
    </>
  );
}
