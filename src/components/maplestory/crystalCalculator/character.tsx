import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { sellCrystalListRecoil } from "../../../constants/recoil";
import { Card, Typography } from "@mui/material";

type Props = {
  idx: number;
};

export function Character({ idx }: Props) {
  const [character, setCharacter] = useRecoilState(sellCrystalListRecoil(idx));
  return (
    <Container>
      {character.map((item, i) => (
        <Item key={i}>
          <Typography textAlign={"center"}>
            {item.difficulty} {item.boss}
          </Typography>
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  overflow: auto;
`;

const Item = styled(Card)`
  flex: 1 0 240px;
`;
