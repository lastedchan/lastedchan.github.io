import React, { useMemo, useState } from "react";
import CoreStackList from "./coreStackList";
import SelectJob from "./selectJob";
import MyCoreGenerator from "./myCoreGenerator";
import MyCoreList from "./myCoreList";
import { Box, Card, SxProps, Tab, Tabs, TextField } from "@mui/material";
import Calculator from "./calculator";
import { sum } from "lodash";
import styled from "@emotion/styled";
import { jobRecoil, stackListRecoil } from "../../../constants/recoil";
import { useRecoilValue } from "recoil";

export default function VMatrixCalculator() {
  const [tab, setTab] = useState<number>(0);

  const job = useRecoilValue(jobRecoil);
  const stackList = useRecoilValue(stackListRecoil(job));
  const coreCount = useMemo<number>(
    () => Math.ceil(sum(Object.values(stackList)) / 3),
    [stackList]
  );

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      <Tabs variant={"fullWidth"} value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label={"직업/스킬"} />
        <Tab label={"내 코어"} disabled={!job} />
        <Tab label={"결과"} disabled={!job} />
      </Tabs>
      <Box flex={1} overflow={"hidden"}>
        <TabPanel index={0} value={tab}>
          <Box display={"flex"} flexDirection={"row"} gap={1} flex={0}>
            <SelectJob />
            <TextField
              label={"코어 수"}
              value={coreCount}
              sx={{ input: { textAlign: "right" } }}
            />
          </Box>
          <CoreStackList />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <Box overflow={"auto"}>
            <Card sx={{ p: 1, mb: 1 }} elevation={4}>
              <MyCoreGenerator />
            </Card>
            <MyCoreList />
          </Box>
        </TabPanel>
        <TabPanel index={2} value={tab}>
          <Calculator coreCount={coreCount} />
        </TabPanel>
      </Box>
    </Box>
  );
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps;
};
function TabPanel({ children, index, value, sx }: TabPanelProps) {
  return (
    <Container role={"tab-panel"} hidden={value !== index}>
      <Wrapper sx={sx}>{children}</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 8px;
  height: 100%;
  overflow: hidden;
`;
