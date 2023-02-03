import { ChangeEvent, useCallback } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { FormControlLabel, Switch } from "@mui/material";

export default function DarkMode() {
  const { mode, setMode } = useDarkMode();

  const onModeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setMode(event.target.checked ? "dark" : "light"), [setMode]);

  return (
    <FormControlLabel
      control={<Switch checked={mode === "dark"} onChange={onModeChange} size={"small"} />}
      label={"다크모드"}
      labelPlacement={"start"}
    />
  );
}
