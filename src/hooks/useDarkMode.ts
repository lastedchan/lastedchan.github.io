import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { darkModeRecoil } from "../recoils";

export default function useDarkMode() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [mode, setMode] = useRecoilState(darkModeRecoil);

  useEffect(() => setMode(new Cookies().get("mode") ?? "light"), [setMode]);
  useEffect(() => setLoaded(true), [mode]);
  useEffect(() => {
    loaded && mode && new Cookies().set("mode", mode);
  }, [loaded, mode]);

  return { mode, setMode, loaded };
}
