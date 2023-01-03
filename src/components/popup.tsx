import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Theme,
} from "@mui/material";
import { useState } from "react";

type Props = {
  title: string;
  sx?: SxProps<Theme>;
  children?: JSX.Element;
};

export default function Popup({ title, sx, children }: Props) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button fullWidth variant={"contained"} onClick={onClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant={"contained"} onClick={() => setOpen(true)} sx={sx}>
        {title} 열기
      </Button>
    </>
  );
}