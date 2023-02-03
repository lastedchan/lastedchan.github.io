import { atom, selectorFamily } from "recoil";
import { characterListType, characterType } from "../types/crystal_calculator";
import { localStorageEffect } from "./index";

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
