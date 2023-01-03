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
  children: JSX.Element;
  sx?: SxProps<Theme>;
};

export default function Popup({ title, children, sx }: Props) {
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
