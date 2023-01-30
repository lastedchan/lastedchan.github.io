export type TabType = {
  title: string | JSX.Element;
  href?: string;
  show: boolean;
} | null;
export type TabListType = TabType[];

//#region vMatrixCalculator
export type JobListType = { [p: string]: string[] };
export type StackListType = { [p: string]: number };
export type CoreType = string[];
export type CoreListType = CoreType[];
export type CalcType = CoreListType[] | false | null;
//#endregion

//#region crystalCalculator
export type bossType = {
  type: "일일" | "주간" | "월간";
  difficulty: "이지" | "노멀" | "하드" | "카오스" | "익스트림";
  name: string;
  price: number;
};
export type bossListType = bossType[];

export type huntedBossType = {
  difficulty: "이지" | "노멀" | "하드" | "카오스" | "익스트림";
  name: string;
  checked?: boolean;
  headcount?: number;
};
export type characterType = [string, huntedBossType[]];
export type characterListType = characterType[];
//#endregion

//#region midnightChaser
export type SlotType = number[];
//#endregion
