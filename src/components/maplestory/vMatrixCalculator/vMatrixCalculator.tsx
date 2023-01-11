import React, { useEffect, useMemo, useRef, useState } from "react";
import CoreStackList from "./coreStackList";
import SelectJob from "./selectJob";
import MyCoreGenerator from "./myCoreGenerator";
import MyCoreList from "./myCoreList";
import { Box, Card, SxProps, Tab, Tabs, Typography } from "@mui/material";
import Calculator from "./calculator";
import { sum } from "lodash";
import styled from "@emotion/styled";
import { jobRecoil, stackListRecoil } from "../../../constants/recoil";
import { useRecoilValue } from "recoil";
import Slider from "react-slick";

export default function VMatrixCalculator() {
  const slider = useRef<Slider>(null);
  const [tab, setTab] = useState<number>(0);

  const job = useRecoilValue(jobRecoil);
  const stackList = useRecoilValue(stackListRecoil(job));
  const coreCount = useMemo<number>(
    () => Math.ceil(sum(Object.values(stackList)) / 3),
    [stackList]
  );

  useEffect(() => slider.current?.slickGoTo(tab), [tab]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
    >
      <Tabs
        variant={"fullWidth"}
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{ flex: "0" }}
      >
        <Tab label={"직업/스킬"} />
        <Tab label={"내 코어"} disabled={!job} />
        <Tab label={"결과"} disabled={!job} />
      </Tabs>
      <Box flex={"1"} overflow={"hidden"}>
        <Slider
          ref={slider}
          arrows={false}
          swipe={false}
          speed={200}
          adaptiveHeight={true}
        >
          <TabPanel>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={1}
              flex={0}
              alignItems={"center"}
            >
              <SelectJob />
              <Typography sx={{ flex: "0 100px", textAlign: "center" }}>
                필요 코어 수<br />
                {coreCount}
              </Typography>
            </Box>
            <CoreStackList />
          </TabPanel>
          <TabPanel>
            <Box overflow={"auto"}>
              <Card sx={{ p: 1, mb: 1 }} elevation={4}>
                <MyCoreGenerator />
              </Card>
              <MyCoreList />
            </Box>
          </TabPanel>
          <TabPanel>
            <Calculator coreCount={coreCount} />
          </TabPanel>
        </Slider>
      </Box>
    </Box>
  );
}

type TabPanelProps = {
  children?: React.ReactNode;
  sx?: SxProps;
};
function TabPanel({ children, sx }: TabPanelProps) {
  return (
    <Container role={"tab-panel"}>
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
