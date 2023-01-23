import styled from "@emotion/styled";
import { Character } from "./character";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { useRecoilState } from "recoil";
import { isRebootRecoil } from "../../../constants/recoil";
import React, { useState } from "react";
import { bossType, huntedBossType } from "../../../constants/types";
import TabList from "./tabList";
import { bossList } from "../../../../pages/crystal_calculator";
import Summary from "./summary";

export default function CrystalCalculator() {
  const [isReboot, setIsReboot] = useRecoilState(isRebootRecoil);
  const [tab, setTab] = useState<number>(0);

  return (
    <Container>
      <Box display={"grid"} gridTemplateColumns={"auto 1fr"} gap={1}>
        <FormControlLabel
          control={
            <Switch
              checked={isReboot}
              onChange={(e, v) => setIsReboot(v)}
              size={"small"}
            />
          }
          label={"리부트"}
          labelPlacement={"start"}
        />
        <TabList tab={tab} setTab={setTab} />
      </Box>
      {tab === 0 ? (
        <Summary></Summary>
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

export const findMatch = (a: huntedBossType, b: bossType) =>
  a.difficulty === b.difficulty && a.name === b.name;

export const getTotalPrice = (
  huntedBossList: huntedBossType[],
  isReboot: boolean
) =>
  huntedBossList
    .filter(_ => _.checked)
    .reduce((prev: number, _) => {
      const boss = bossList.find(__ => findMatch(_, __));
      return boss ? prev + Math.floor(boss.price / (_.headcount ?? 1)) : prev;
    }, 0) * (isReboot ? 5 : 1);
