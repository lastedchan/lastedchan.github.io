export type TabType = {
  title: string;
  href?: string;
  show: boolean;
} | null;

//#region midnightChaser
export type TabListType = TabType[];
export type SlotType = number[];
//#endregion

//#region vMatrixCalculator
export type JobListType = { [p: string]: string[] };
export type StackListType = { [p: string]: number };
export type CoreType = string[];
export type CoreListType = CoreType[];
export type CalcType = CoreListType[] | false | null;
//#endregion
