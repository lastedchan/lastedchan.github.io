import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  opener: JSX.Element;
  children?: JSX.Element;
};

export default function Popup({ title, opener, children }: Props) {
  const [open, setOpen] = useState(false);
  const onClose = (e?: any) => {
    setOpen(false);
    if (e) history.back();
  };

  useEffect(() => {
    if (open) {
      history.pushState(null, document.title, location.href);
      window.onpopstate = e => {
        e.preventDefault();
        onClose();
        return false;
      };
      return () => {
        window.onpopstate = null;
      };
    }
  }, [open]);

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
      <span onClick={() => setOpen(true)}>{opener}</span>
    </>
  );
}
