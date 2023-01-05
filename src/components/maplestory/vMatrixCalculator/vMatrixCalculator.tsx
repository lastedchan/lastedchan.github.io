import React, { useEffect, useState } from "react";
import CoreStackList from "./coreStackList";
import { stackListType } from "../../../constants/types";
import SelectJob from "./selectJob";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";
import MyCoreGenerator from "./myCoreGenerator";
import MyCoreList from "./myCoreList";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import Popup from "../../popup";
import { jobList } from "../../../../pages/v_matrix_calculator";
import Calculator from "./calculator";
import { sum } from "lodash";
import styled from "@emotion/styled";

export default function VMatrixCalculator() {
  const [tab, setTab] = useState<number>(0);

  const [job, setJob] = useState<string>(
    localStorage.getItem(COOKIE_PREFIX_V_MATRIX_CALCULATOR + "job") ?? ""
  );
  const [coreStackList, setCoreStackList] = useState<stackListType>({});
  const [coreCount, setCoreCount] = useState<number>(0);
  const [myCoreList, setMyCoreList] = useState<string[][]>([]);

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
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      <Tabs variant={"fullWidth"} value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label={"직업 / 코어 중첩"} />
        <Tab label={"내 코어"} disabled={!job} />
        <Tab label={"결과"} disabled={!job} />
      </Tabs>
      <Box flex={1} overflow={"auto"}>
        <TabPanel index={0} value={tab}>
          <Box display={"flex"} flexDirection={"row"} gap={1} flex={0}>
            <SelectJob job={job} setJob={setJob} />
            <TextField
              label={"코어 수"}
              value={coreCount}
              sx={{ input: { textAlign: "right" } }}
            />
          </Box>
          <CoreStackList
            job={job}
            coreStackList={coreStackList}
            setCoreStackList={setCoreStackList}
            sx={{ flex: 1, overflow: "auto" }}
          />
        </TabPanel>
        <TabPanel index={1} value={tab}></TabPanel>
        <TabPanel index={2} value={tab}></TabPanel>
        <TabPanel index={3} value={tab}></TabPanel>
      </Box>
      {false && (
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
      )}
    </Box>
  );
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};
function TabPanel({ children, index, value }: TabPanelProps) {
  return (
    <div role={"tabpanel"} hidden={value !== index}>
      <Container>{children}</Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding: 12px;
`;
