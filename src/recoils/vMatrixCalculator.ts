import { atom, atomFamily } from "recoil";
import { CoreListType, StackListType } from "../types/vMatrixCalculator";
import { localStorageEffect } from "./index";
import { jobList } from "../constants/vMatrixCalculator";

export const jobRecoil = atom<string>({
  key: "jobRecoil",
  default: "",
  effects: [localStorageEffect<string>("v_matrix_calculator_job")],
});
export const stackListRecoil = atomFamily<StackListType, string>({
  key: "stackListRecoil",
  default: job => jobList[job]?.reduce((prev, item) => ({ ...prev, [item]: 0 }), {}) ?? {},
  effects: job => [localStorageEffect<StackListType>("v_matrix_calculator_core_stack_" + job)],
});
export const coreListRecoil = atomFamily<CoreListType, string>({
  key: "coreListRecoil",
  default: [],
  effects: job => [localStorageEffect<CoreListType>("v_matrix_calculator_my_core_list_" + job)],
});
