import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Tab, Tabs } from "@mui/material";
import * as gtag from "../../../libs/gtag";
import TabContextMenu from "../molcules/tabContextMenu";
import { characterListRecoil } from "../../../recoils/crystal_calculator";

type TabListProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
export default function TabList({ tab, setTab }: TabListProps) {
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);
  const [contextMenuIdx, setContextMenuIdx] = useState<number>(-1);
  const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLElement>();

  const addCharacter = useCallback(() => {
    gtag.event({
      action: "cc_add_character",
      value: String(characterList.length + 1),
    });
    setCharacterList(prev => [...prev, [`캐릭터 ${characterList.length + 1}`, []]]);
  }, [characterList.length, setCharacterList]);
  const onContextMenu = useCallback((e: any, idx: number) => {
    e.preventDefault();
    setContextMenuAnchor(e.currentTarget);
    setContextMenuIdx(idx);
  }, []);
  const onContextMenuClose = useCallback(() => setContextMenuIdx(-1), []);

  useEffect(() => {
    characterList.length && tab > characterList.length && setTab(characterList.length);
  }, [characterList, setTab, tab]);

  return (
    <>
      <Tabs variant={"scrollable"} value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label={"수익 결산"} sx={{ position: "relative" }} />
        {characterList.map(([idx], i) => (
          <Tab key={i + idx} label={idx} onContextMenu={e => onContextMenu(e, i)} />
        ))}
        <Tab label={"+"} onClick={addCharacter} />
      </Tabs>
      <TabContextMenu
        open={contextMenuIdx > -1}
        idx={contextMenuIdx}
        anchorEl={contextMenuAnchor}
        setTab={setTab}
        onClose={onContextMenuClose}
      />
    </>
  );
}
