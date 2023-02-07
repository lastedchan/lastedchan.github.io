import { atom, selectorFamily } from "recoil";
import { CharacterListType, CharacterType } from "../types/crystalCalculator";
import { localStorageEffect } from "./index";

export const isRebootRecoil = atom<boolean>({
  key: "isRebootRecoil",
  default: false,
  effects: [localStorageEffect<boolean>("crystal_calculator_is_reboot")],
});
export const characterListRecoil = atom<CharacterListType>({
  key: "characterListRecoil",
  default: [],
  effects: [localStorageEffect<CharacterListType>("crystal_calculator_character_list")],
});
export const characterSelector = selectorFamily<CharacterType, number>({
  key: "characterSelector",
  get:
    idx =>
    ({ get }) =>
      get(characterListRecoil)[idx],
});
