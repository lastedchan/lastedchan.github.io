import { TabListType } from "./types";
import VMatrixCalculatorHelp from "../components/maplestory/vMatrixCalculator/vMatrixCalculatorHelp";

export const topTitle = "LASTCHAN";

export const tabList: TabListType = [
  { title: "결정석 수익 계산기", show: false, href: "/" },
  { title: "MapleStory", show: true },
  { title: "결정석 수익 계산기", show: true, href: "/crystal_calculator" },
  {
    title: "V 매트릭스 계산기",
    show: true,
    href: "/v_matrix_calculator",
    help: <VMatrixCalculatorHelp />,
  },
  { title: "미드나잇 체이서 도우미", show: false, href: "/midnight_chaser" },
];
