import React, { Dispatch, SetStateAction } from "react";
import { Tab, Tabs } from "@mui/material";

type TabListProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
export default function TabList({ tab, setTab }: TabListProps) {
  return (
    <Tabs variant={"scrollable"} value={tab} onChange={(e, v) => setTab(v)}>
      <Tab label={"캐릭터"} />
      <Tab label={"수익 결산"} />
      <Tab label={"보스 통계"} />
    </Tabs>
  );
}
