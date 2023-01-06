import { atom, AtomEffect, atomFamily } from "recoil";
import { CoreListType, StackListType } from "./types";

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

//#region v matrix calc
export const V_MATRIX_CALCULATOR_PREFIX = "v_matrix_calculator_";

export const jobRecoil = atom<string>({
  key: "jobRecoil",
  default: "",
  effects: [localStorageEffect<string>(V_MATRIX_CALCULATOR_PREFIX + "job")],
});

export const stackListRecoil = atomFamily<StackListType, string>({
  key: "stackListRecoil",
  default: {},
  effects: job => [
    localStorageEffect<StackListType>(
      V_MATRIX_CALCULATOR_PREFIX + "core_stack_" + job
    ),
  ],
});

export const coreListRecoil = atomFamily<CoreListType, string>({
  key: "coreListRecoil",
  default: [],
  effects: job => [
    localStorageEffect<CoreListType>(
      V_MATRIX_CALCULATOR_PREFIX + "my_core_list_" + job
    ),
  ],
});
//#endregion
