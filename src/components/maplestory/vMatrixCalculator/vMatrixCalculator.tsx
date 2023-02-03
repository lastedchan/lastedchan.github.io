import React, { useEffect, useMemo, useRef, useState } from "react";
import StackList from "./stackList";
import SelectJob from "./selectJob";
import CoreGenerator from "./coreGenerator";
import CoreList from "./coreList";
import {
  Box,
  Card,
  SxProps,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Calculator from "./calculator";
import { sum } from "lodash";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import Slider from "react-slick";
import AdWrapper from "../../adWrapper";
import {
  jobRecoil,
  stackListRecoil,
} from "../../../recoils/v_matrix_calculator";

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

  const isMobile = useMediaQuery("(max-width:959px)");

  const Group1 = () => (
    <>
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
      <AdWrapper>
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-8583770780355894"
          data-ad-slot="4169298389"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </AdWrapper>
      <StackList />
    </>
  );
  const Group2 = () => (
    <Box overflow={"auto"}>
      <Card sx={{ p: 1, mb: 1 }} elevation={4}>
        <CoreGenerator />
      </Card>
      <CoreList />
    </Box>
  );
  const Group3 = () => <Calculator coreCount={coreCount} />;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
    >
      {isMobile ? (
        <>
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
                <Group1 />
              </TabPanel>
              <TabPanel>
                <Group2 />
              </TabPanel>
              <TabPanel>
                <Group3 />
              </TabPanel>
            </Slider>
          </Box>
        </>
      ) : (
        <Box display={"flex"} flexDirection={"row"} overflow={"hidden"}>
          <TabPanel>
            <Typography textAlign={"center"}>직업/스킬</Typography>
            <Group1 />
          </TabPanel>
          <TabPanel>
            <Typography textAlign={"center"}>내 코어</Typography>
            <Group2 />
          </TabPanel>
          <TabPanel>
            <Typography textAlign={"center"}>결과</Typography>
            <Group3 />
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}

type TabPanelProps = { children?: React.ReactNode; sx?: SxProps };
function TabPanel({ children, sx }: TabPanelProps) {
  return (
    <Container role={"tab-panel"}>
      <Wrapper sx={sx}>{children}</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
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
