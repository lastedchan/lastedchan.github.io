export type TabType = {
  title: string;
  href?: string;
  show: boolean;
} | null;

//#region vMatrixCalculator
export type JobListType = { [p: string]: string[] };
export type StackListType = { [p: string]: number };
export type CoreType = string[];
export type CoreListType = CoreType[];
export type CalcType = CoreListType[] | false | null;
//#endregion

//#region crystalCalculator
export type crystalPriceType = {
  type: "일일" | "주간" | "월간";
  difficulty: "이지" | "노멀" | "하드" | "카오스" | "익스트림";
  boss: string;
  price: number;
};
export type crystalPriceListType = crystalPriceType[];
export type characterType = [
  string,
  {
    difficulty: "이지" | "노멀" | "하드" | "카오스" | "익스트림";
    boss: string;
    amount?: number;
    headcount?: number;
  }[]
];
export type characterListType = characterType[];
//#endregion

//#region midnightChaser
export type TabListType = TabType[];
export type SlotType = number[];
//#endregion
