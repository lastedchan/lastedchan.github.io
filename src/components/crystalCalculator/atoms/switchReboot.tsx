import { useRecoilState } from "recoil";
import { isRebootRecoil } from "../../../recoils/crystalCalculator";
import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

export default function SwitchReboot() {
  const [isReboot, setIsReboot] = useRecoilState(isRebootRecoil);

  return (
    <FormControlLabel
      control={<Switch checked={isReboot} onChange={(e, v) => setIsReboot(v)} size={"small"} />}
      label={"리부트"}
      labelPlacement={"start"}
    />
  );
}
