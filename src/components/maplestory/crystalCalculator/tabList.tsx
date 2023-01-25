import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { characterListRecoil } from "../../../constants/recoil";
import { Tab, Tabs } from "@mui/material";
import * as gtag from "../../../lib/gtag";

type TabListProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
export default function TabList({ tab, setTab }: TabListProps) {
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);
  useEffect(() => {
    characterList.length &&
      tab > characterList.length &&
      setTab(characterList.length);
  }, [characterList, setTab, tab]);
  const addCharacter = useCallback(() => {
    gtag.event({
      action: "cc_add_character",
      value: String(characterList.length + 1),
    });
    setCharacterList(prev => [
      ...prev,
      [`캐릭터 ${characterList.length + 1}`, []],
    ]);
  }, [characterList.length, setCharacterList]);

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
