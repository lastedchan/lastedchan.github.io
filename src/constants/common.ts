import VMatrixCalculatorHelp from "../components/vMatrixCalculator/vMatrixCalculatorHelp";
import { TabListType } from "../types";

export const MAIN_TITLE = "LASTCHAN";

export const TAB_LIST: TabListType = [
  { title: "MapleStory", show: true },
  { title: "결정석 수익 계산기", show: true, href: "/" },
  { title: "결정석 수익 계산기", show: false, href: "/crystal_calculator" },
  { title: "코어 조합 계산기", show: true, href: "/v_matrix_calculator", help: VMatrixCalculatorHelp() },
  { title: "미드나잇 체이서 도우미", show: true, href: "/midnight_chaser" },
];
