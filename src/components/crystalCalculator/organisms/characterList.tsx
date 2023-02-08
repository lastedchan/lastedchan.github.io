import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Tab, Tabs } from "@mui/material";
import TabContextMenu from "../molcules/tabContextMenu";
import { characterListRecoil } from "../../../recoils/crystalCalculator";
import useCharacterList from "../../../hooks/useCharacterList";

type TabListProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
export default function CharacterList({ tab, setTab }: TabListProps) {
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);
  const [contextMenuIdx, setContextMenuIdx] = useState<number>(-1);
  const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLElement>();
  const { addCharacter } = useCharacterList();

  const onContextMenu = useCallback((e: any, idx: number) => {
    e.preventDefault();
    setContextMenuAnchor(e.currentTarget);
    setContextMenuIdx(idx);
  }, []);
  const onContextMenuClose = useCallback(() => setContextMenuIdx(-1), []);

  useEffect(() => {
    characterList.length === 0 && setCharacterList(prev => [...prev, [`캐릭터 ${characterList.length + 1}`, []]]);
  }, []);

  useEffect(() => {
    tab > characterList.length && setTab(characterList.length - 1);
  }, [characterList, setTab, tab]);

  return (
    <Tabs orientation={"vertical"} variant={"scrollable"} value={tab} onChange={(e, v) => setTab(v)}>
      {characterList.map(([idx], i) => (
        <Tab key={i + idx} label={idx} onContextMenu={e => onContextMenu(e, i)} />
      ))}
      <Tab label={"+"} onClick={addCharacter} />
      <TabContextMenu
        open={contextMenuIdx > -1}
        idx={contextMenuIdx}
        anchorEl={contextMenuAnchor}
        setTab={setTab}
        onClose={onContextMenuClose}
      />
    </Tabs>
  );
}
