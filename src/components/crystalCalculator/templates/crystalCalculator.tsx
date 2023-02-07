import styled from "@emotion/styled";
import { Character } from "../organisms/character";
import { Box } from "@mui/material";
import React, { useState } from "react";
import TabList from "../organisms/tabList";
import Summary from "../organisms/summary";
import SwitchReboot from "../atoms/switchReboot";

export default function CrystalCalculator() {
  const [tab, setTab] = useState<number>(0);

  return (
    <Container>
      <Box display={"grid"} gridTemplateColumns={"auto 1fr"} gap={1}>
        <SwitchReboot />
        <TabList tab={tab} setTab={setTab} />
      </Box>
      <Box flex={"1"} overflow={"hidden"}>
        {tab === 0 ? <Summary setTab={setTab} /> : <Character idx={tab - 1} />}
      </Box>
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
