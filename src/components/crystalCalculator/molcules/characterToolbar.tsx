import { ButtonGroup } from "@mui/material";
import styled from "@emotion/styled";
import RemoveCharacter from "../atoms/removeCharacter";
import ChangeName from "../atoms/changeName";
import CopyCharacter from "../atoms/copyCharacter";
import CharacterName from "../atoms/characterName";
import { Props } from "../organisms/character";

export default function CharacterToolbar({ idx }: Props) {
  return (
    <Container>
      <ButtonGroup sx={{ gap: 0.5, alignItems: "center" }}>
        <CharacterName idx={idx} />
        <ChangeName idx={idx} />
        <CopyCharacter idx={idx} />
      </ButtonGroup>
      <RemoveCharacter idx={idx} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
  align-items: center;
`;
