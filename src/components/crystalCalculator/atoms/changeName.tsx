import useCharacterList from "../../../hooks/useCharacterList";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Props } from "../organisms/character";

export default function ChangeName({ idx }: Props) {
  const { changeName } = useCharacterList().character(idx);
  return (
    <IconButton onClick={changeName}>
      <EditIcon />
    </IconButton>
  );
}
