import { AppBar, Box, Drawer, FormControlLabel, IconButton, PaletteMode, Switch, Toolbar, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TabList from "../organisms/tabList";
import { useRouter } from "next/router";
import { TAB_LIST } from "../../constants/common";
import Popup from "../popup";
import VMatrixCalculatorHelp from "../vMatrixCalculator/vMatrixCalculatorHelp";
import HelpIcon from "@mui/icons-material/Help";
import * as gtag from "../../libs/gtag";

type Props = {
  mode: "light" | "dark";
  setMode: Dispatch<SetStateAction<PaletteMode>>;
};

export default function Header({ mode, setMode }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const current = useMemo(() => TAB_LIST.find(_ => _?.href === router.pathname), [router.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  const onModeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setMode(event.target.checked ? "dark" : "light"), [setMode]);

  return (
    <>
      <AppBar position={"sticky"}>
        <Toolbar variant={"dense"}>
          <Box sx={{ flex: "0 auto" }}>
            <IconButton
              onClick={() => {
                gtag.event({ action: "open_sidebar" });
                setOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography sx={{ flex: 1, p: 2 }}>{current?.title}</Typography>
          {current?.help && (
            <Popup
              title={"가이드"}
              opener={
                <IconButton>
                  <HelpIcon />
                </IconButton>
              }
            >
              <VMatrixCalculatorHelp />
            </Popup>
          )}
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={onModeChange} size={"small"} />}
            label={"다크모드"}
            labelPlacement={"start"}
          />
        </Toolbar>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <TabList tabList={TAB_LIST} />
        </Drawer>
      </AppBar>
    </>
  );
}
