import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TabList from "../organisms/tabList";
import { useRouter } from "next/router";
import { TAB_LIST } from "../../../constants/common";
import Popup from "../../common/molcules/popup";
import HelpIcon from "@mui/icons-material/Help";
import * as gtag from "../../../libs/gtag";
import DarkMode from "../atoms/darkMode";

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const current = useMemo(() => TAB_LIST.find(_ => _?.href === router.pathname), [router.pathname]);

  useEffect(() => setOpen(false), [router.pathname]);

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
              {current.help}
            </Popup>
          )}
          <DarkMode />
        </Toolbar>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <TabList />
        </Drawer>
      </AppBar>
    </>
  );
}
