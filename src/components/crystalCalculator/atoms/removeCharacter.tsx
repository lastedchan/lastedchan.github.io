import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useCharacterList from "../../../hooks/useCharacterList";
import { Props } from "../organisms/character";

export default function RemoveCharacter({ idx }: Props) {
  const { removeCharacter } = useCharacterList().character(idx);
  return (
    <IconButton onClick={removeCharacter}>
      <DeleteIcon color={"error"} />
    </IconButton>
  );
}
