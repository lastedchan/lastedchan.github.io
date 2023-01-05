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
export type CoreStackListType = { [p: string]: number };
//#endregion
