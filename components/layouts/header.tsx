import {
  AppBar,
  Box,
  Drawer,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TabList from "./tabList";
import { useRouter } from "next/router";
import { tabList } from "../../constants/common";

type Props = {
  title?: string;
  mode: "light" | "dark";
  setMode: Dispatch<SetStateAction<"light" | "dark">>;
};

export default function Header({ title, mode, setMode }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  const onModeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setMode(event.target.checked ? "dark" : "light"),
    [setMode]
  );

  return (
    <>
      <AppBar position={"sticky"}>
        <Toolbar variant={"dense"}>
          <Box sx={{ flex: "0 auto" }}>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography sx={{ flex: 1, p: 2 }}>{title}</Typography>
          <FormControlLabel
            control={
              <Switch checked={mode === "dark"} onChange={onModeChange} />
            }
            label={mode}
          />
        </Toolbar>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <TabList tabs={tabList} />
        </Drawer>
      </AppBar>
    </>
  );
}
