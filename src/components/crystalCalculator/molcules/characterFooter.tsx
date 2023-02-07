import { Props } from "../organisms/character";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import useCharacterList from "../../../hooks/useCharacterList";

export default function CharacterFooter({ idx }: Props) {
  const { character, totalPrice } = useCharacterList().character(idx);
  return (
    <Container>
      <Typography>총 주간 수익</Typography>
      <Typography>{totalPrice.toLocaleString()}</Typography>
      <Typography>총 사냥 보스</Typography>
      <Typography>{character[1].filter(_ => _.checked).length}</Typography>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto 1fr;
  gap: 8px;
  padding: 0 8px 8px;
`;
