import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  characterListRecoil,
  characterSelector,
} from "../../../constants/recoil";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import { colors, crystalPriceList } from "../../../../pages/crystal_calculator";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  idx: number;
};

export function Character({ idx }: Props) {
  const character = useRecoilValue(characterSelector(idx));
  const setCharacterList = useSetRecoilState(characterListRecoil);
  const removeCharacter = () =>
    setCharacterList(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);

  const findMatch = (a: any, b: any) =>
    a.difficulty === b.difficulty && a.boss === b.boss;

  return (
    <Container>
      <HeadWrapper>
        <Typography>{character[0]}</Typography>
        <IconButton color={"error"} onClick={removeCharacter}>
          <DeleteIcon />
        </IconButton>
      </HeadWrapper>
      <Grid container spacing={1} overflow={"auto"}>
        {crystalPriceList
          .filter(item => item.type !== "일일")
          .map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2} pt={1}>
              <Item>
                <Typography
                  textAlign={"center"}
                  bgcolor={colors.find(_ => _.str === item.difficulty)?.bgcolor}
                  color={colors.find(_ => _.str === item.difficulty)?.color}
                >
                  {item.difficulty} {item.boss}
                </Typography>
                <Typography textAlign={"right"}>
                  {item.price.toLocaleString("ko-KR")}
                </Typography>
                <Typography>
                  {character[1].find(_ => findMatch(_, item))?.amount}
                </Typography>
              </Item>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
`;

const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled(Paper)`
  //flex: 1 1 45%;
  padding: 8px;
  width: 100%;
`;
