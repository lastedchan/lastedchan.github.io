import styled from "@emotion/styled";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useRecoilState } from "recoil";
import { Dispatch, SetStateAction, useCallback } from "react";
import { reorder } from "../../../libs/helpers";
import useCharacterList from "../useCharacterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { characterListRecoil } from "../../../recoils/crystal_calculator";

type Props = {
  open: boolean;
  idx: number;
  anchorEl?: Element;
  setTab: Dispatch<SetStateAction<number>>;
  onClose: () => void;
};

export default function TabContextMenu({ open, idx, anchorEl, setTab, onClose }: Props) {
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);

  const { changeName, removeCharacter } = useCharacterList().character(idx);

  const goFirst = useCallback(() => {
    setCharacterList(prev => reorder(prev, idx, 0));
    setTab(1);
    onClose();
  }, [idx, onClose, setCharacterList, setTab]);
  const goLeft = useCallback(() => {
    setCharacterList(prev => reorder(prev, idx, idx - 1));
    setTab(idx);
    onClose();
  }, [idx, onClose, setCharacterList, setTab]);
  const goRight = useCallback(() => {
    setCharacterList(prev => reorder(prev, idx, idx + 1));
    setTab(idx + 2);
    onClose();
  }, [idx, onClose, setCharacterList, setTab]);
  const goLast = useCallback(() => {
    setCharacterList(prev => reorder(prev, idx, prev.length - 1));
    setTab(characterList.length);
    onClose();
  }, [characterList.length, idx, onClose, setCharacterList, setTab]);

  return (
    <Container role={"tab-context-menu"}>
      <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
        <MenuItem
          onClick={() => {
            onClose();
            setTimeout(changeName, 1);
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={"이름 변경"} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClose();
            setTimeout(removeCharacter, 1);
          }}
        >
          <ListItemIcon>
            <DeleteIcon color={"error"} />
          </ListItemIcon>
          <ListItemText primary={"삭제"} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={goFirst} disabled={idx <= 0}>
          <ListItemIcon>
            <KeyboardDoubleArrowLeftIcon />
          </ListItemIcon>
          <ListItemText primary={"맨 앞으로"} />
        </MenuItem>
        <MenuItem onClick={goLeft} disabled={idx <= 0}>
          <ListItemIcon>
            <KeyboardArrowLeftIcon />
          </ListItemIcon>
          <ListItemText primary={"한 칸 앞으로"} />
        </MenuItem>
        <MenuItem onClick={goRight} disabled={idx >= characterList.length - 1}>
          <ListItemIcon>
            <KeyboardArrowRightIcon />
          </ListItemIcon>
          <ListItemText primary={"한 칸 뒤로"} />
        </MenuItem>
        <MenuItem onClick={goLast} disabled={idx >= characterList.length - 1}>
          <ListItemIcon>
            <KeyboardDoubleArrowRightIcon />
          </ListItemIcon>
          <ListItemText primary={"맨 뒤로"} />
        </MenuItem>
      </Menu>
    </Container>
  );
}

const Container = styled.div``;
