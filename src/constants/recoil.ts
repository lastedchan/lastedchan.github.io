import { atom, AtomEffect, atomFamily } from "recoil";
import { CoreListType, crystalPriceListType, StackListType } from "./types";
import { jobList } from "../../pages/v_matrix_calculator";
import { topTitle } from "./common";
import { crystalPriceList } from "../../pages/crystal_calculator";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const titleRecoil = atom<string>({
  key: "titleRecoil",
  default: topTitle,
});

//#region v matrix calc
export const jobRecoil = atom<string>({
  key: "jobRecoil",
  default: "",
  effects: [localStorageEffect<string>("v_matrix_calculator_job")],
});
export const stackListRecoil = atomFamily<StackListType, string>({
  key: "stackListRecoil",
  default: job =>
    jobList[job]?.reduce((prev, item) => ({ ...prev, [item]: 0 }), {}) ?? {},
  effects: job => [
    localStorageEffect<StackListType>("v_matrix_calculator_core_stack_" + job),
  ],
});
export const coreListRecoil = atomFamily<CoreListType, string>({
  key: "coreListRecoil",
  default: [],
  effects: job => [
    localStorageEffect<CoreListType>("v_matrix_calculator_my_core_list_" + job),
  ],
});
//#endregion

//#region crystalCalculator
export const sellCrystalListRecoil = atomFamily<crystalPriceListType, number>({
  key: "sellCrystalListRecoil",
  default: crystalPriceList,
  effects: idx => [
    localStorageEffect<crystalPriceListType>(
      "crystal_calculator_character" + idx
    ),
  ],
});
//#endregion
