import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  characterListRecoil,
  characterSelector,
} from "../../../constants/recoil";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { colors, crystalPriceList } from "../../../../pages/crystal_calculator";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  idx: string;
  number: number;
};

export function Character({ idx, number }: Props) {
  const character = useRecoilValue(characterSelector(idx));
  const setCharacterList = useSetRecoilState(characterListRecoil);
  const removeCharacter = () =>
    setCharacterList(prev =>
      Object.entries(prev)
        .filter(([key]) => key !== idx)
        .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})
    );

  const findMatch = (a: any, b: any) =>
    a.difficulty === b.difficulty && a.boss === b.boss;

  return (
    <Container>
      <Wrapper sx={{ justifyContent: "space-between" }}>
        <Typography>{number + 1}</Typography>
        <IconButton color={"error"} onClick={removeCharacter}>
          <DeleteIcon />
        </IconButton>
      </Wrapper>
      <Wrapper>
        {crystalPriceList
          .filter(item => item.type !== "일일")
          .map((item, i) => (
            <Item key={i}>
              <Typography
                textAlign={"center"}
                bgcolor={colors.find(_ => _.str === item.difficulty)?.bgcolor}
                color={colors.find(_ => _.str === item.difficulty)?.color}
              >
                {item.difficulty} {item.boss}
              </Typography>
              <Typography>{item.price.toLocaleString("ko-KR")}</Typography>
              <Typography>
                {character.find(_ => findMatch(_, item))?.amount}
              </Typography>
            </Item>
          ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 4px;
  align-items: center;
  overflow-x: auto;
`;

const Item = styled(Card)`
  flex: 1 0 240px;
  padding: 8px;
`;
