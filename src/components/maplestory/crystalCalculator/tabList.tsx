import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { characterListRecoil } from "../../../constants/recoil";
import { Tab, Tabs } from "@mui/material";

type TabListProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
export default function TabList({ tab, setTab }: TabListProps) {
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);
  useEffect(() => {
    characterList.length &&
      tab > characterList.length &&
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
      <Tab label={"수익 결산"} />
      {characterList.map(([idx], i) => (
        <Tab key={i + idx} label={idx} />
      ))}
      <Tab label={"+"} onClick={addCharacter} />
    </Tabs>
  );
}
