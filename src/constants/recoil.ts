import { atom, AtomEffect, atomFamily, selectorFamily } from "recoil";
import {
  characterListType,
  characterType,
  CoreListType,
  StackListType,
} from "./types";
import { jobList } from "../../pages/v_matrix_calculator";
import { topTitle } from "./common";

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
export const isRebootRecoil = atom<boolean>({
  key: "isRebootRecoil",
  default: false,
  effects: [localStorageEffect<boolean>("crystal_calculator_is_reboot")],
});
export const characterListRecoil = atom<characterListType>({
  key: "characterListRecoil",
  default: [],
  effects: [
    localStorageEffect<characterListType>("crystal_calculator_character_list"),
  ],
});

export const characterSelector = selectorFamily<characterType, number>({
  key: "characterSelector",
  get:
    idx =>
    ({ get }) =>
      get(characterListRecoil)[idx],
});
//#endregion
