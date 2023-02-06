import styled from "@emotion/styled";
import { Character } from "./character";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import TabList from "./tabList";
import Summary from "./summary";
import { isRebootRecoil } from "../../recoils/crystal_calculator";

export default function CrystalCalculator() {
  const [isReboot, setIsReboot] = useRecoilState(isRebootRecoil);
  const [tab, setTab] = useState<number>(0);

  return (
    <Container>
      <Box display={"grid"} gridTemplateColumns={"auto 1fr"} gap={1}>
        <FormControlLabel
          control={<Switch checked={isReboot} onChange={(e, v) => setIsReboot(v)} size={"small"} />}
          label={"리부트"}
          labelPlacement={"start"}
        />
        <TabList tab={tab} setTab={setTab} />
      </Box>
      {tab === 0 ? (
        <Summary setTab={setTab} />
      ) : (
        <Box flex={"1"} overflow={"hidden"}>
          <Character idx={tab - 1} />
        </Box>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
`;
