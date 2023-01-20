import styled from "@emotion/styled";
import { Character } from "./character";
import { Box, Tab, Tabs } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { characterListRecoil } from "../../../constants/recoil";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import TabPanel from "../../tabPanel";

export default function CrystalCalculator() {
  const characterList = useRecoilValue(characterListRecoil);
  const [tab, setTab] = useState<number>(0);
  const slider = useRef<Slider>(null);

  useEffect(() => slider.current?.slickGoTo(tab), [tab]);

  return (
    <Container>
      <TabList tab={tab} setTab={setTab} />
      <Box flex={"1"} overflow={"hidden"}>
        {characterList.map(([idx], i) => (
          <TabPanel key={i} idx={i} value={tab}>
            <Character idx={i} />
          </TabPanel>
        ))}
      </Box>
    </Container>
  );
}

type TabListProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
function TabList({ tab, setTab }: TabListProps) {
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);
  useEffect(() => {
    characterList.length &&
      tab >= characterList.length &&
      setTab(characterList.length - 1);
  }, [characterList, setTab, tab]);
  const addCharacter = useCallback(
    () =>
      setCharacterList(prev => [
        ...prev,
        [`캐릭터 ${characterList.length + 1}`, []],
      ]),
    [characterList.length, setCharacterList]
  );

  return (
    <Tabs variant={"scrollable"} value={tab} onChange={(e, v) => setTab(v)}>
      {characterList.map(([idx], i) => (
        <Tab key={i + idx} label={idx} />
      ))}
      <Tab label={"+"} onClick={addCharacter} />
    </Tabs>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
`;
