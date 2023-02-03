import { atom, AtomEffect } from "recoil";
import { PaletteMode } from "@mui/material";

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const darkModeRecoil = atom<PaletteMode>({
  key: "darkModeRecoil",
  default: "light",
});
