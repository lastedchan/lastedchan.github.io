import styled from "@emotion/styled";
import { Character } from "../organisms/character";
import { Box } from "@mui/material";
import React, { useState } from "react";
import CharacterList from "../organisms/characterList";
import SummaryCharacter from "../organisms/summaryCharacter";
import SwitchReboot from "../atoms/switchReboot";
import TabList from "../organisms/tabList";
import SummaryBoss from "../organisms/summaryBoss";

export default function CrystalCalculator() {
  const [tab, setTab] = useState<number>(0);
  const [characterTab, setCharacterTab] = useState<number>(0);

  return (
    <Container>
      <Box display={"grid"} gridTemplateColumns={"auto 1fr"} gap={1}>
        <SwitchReboot />
        <TabList tab={tab} setTab={setTab} />
      </Box>
      <Box flex={"1"} overflow={"hidden"}>
        {tab === 0 ? (
          <Box display={"flex"} flexDirection={"row"} height={"100%"} overflow={"hidden"}>
            <CharacterList tab={characterTab} setTab={setCharacterTab} />
            <Character idx={characterTab} />
          </Box>
        ) : tab === 1 ? (
          <SummaryCharacter setTab={setCharacterTab} />
        ) : (
          <SummaryBoss />
        )}
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
