import useCharacterList from "../../../hooks/useCharacterList";
import { Typography } from "@mui/material";
import { Props } from "../organisms/character";

export default function CharacterName({ idx }: Props) {
  const { characterName } = useCharacterList().character(idx);
  return <Typography pr={1}>{characterName}</Typography>;
}
