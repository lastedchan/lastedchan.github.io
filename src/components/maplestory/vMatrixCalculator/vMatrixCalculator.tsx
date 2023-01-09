import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const onSlide = (prev: number, curr: number) => setTab(curr);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      overflow={"hidden"}
    >
      <Tabs variant={"fullWidth"} value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label={"직업/스킬"} />
        <Tab label={"내 코어"} disabled={!job} />
        <Tab label={"결과"} disabled={!job} />
      </Tabs>
      <Slider
        ref={slider}
        dots={false}
        infinite={false}
        autoplay={false}
        arrows={false}
        swipe={false}
        beforeChange={onSlide}
        speed={100}
        adaptiveHeight={true}
      >
        <TabPanel>
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
