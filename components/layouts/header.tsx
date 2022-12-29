import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TabList from "./tabList";
import { useRouter } from "next/router";
import { tabList } from "../../constants/common";

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  return (
    <>
      <AppBar position={"sticky"}>
        <Toolbar variant={"dense"}>
          <Box sx={{ flex: "0 auto" }}>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography sx={{ flex: 1, p: 2 }}>LASTCHAN</Typography>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <TabList tabs={tabList} />
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}
