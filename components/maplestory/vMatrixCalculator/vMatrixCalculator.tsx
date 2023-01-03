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
  const [slotCount, setSlotCount] = useState<number>();
  const [coreStackList, setCoreStackList] = useState<CoreStackListType>({});
  const [myCoreList, setMyCoreList] = useState<string[][]>([]);

  // 사용할 코어 개수 로드
  useEffect(
    () =>
      setSlotCount(
        Number(
          localStorage.getItem(
            COOKIE_PREFIX_V_MATRIX_CALCULATOR + "slot_count"
          ) ?? 0
        )
      ),
    []
  );
  useEffect(() => {
    if (slotCount !== undefined) {
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
          label={"코어 수"}
          value={slotCount ?? ""}
          onChange={e => setSlotCount(Number(e.target.value))}
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
      <Button variant={"contained"} color={"secondary"} sx={{ flex: 0 }}>
        계산
      </Button>
    </>
  );
}
