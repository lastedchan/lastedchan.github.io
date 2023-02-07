import useCharacterList from "../../../hooks/useCharacterList";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Props } from "../organisms/character";

export default function CopyCharacter({ idx }: Props) {
  const { copyCharacter } = useCharacterList().character(idx);
  return (
    <IconButton onClick={copyCharacter}>
      <ContentCopyIcon />
    </IconButton>
  );
}
