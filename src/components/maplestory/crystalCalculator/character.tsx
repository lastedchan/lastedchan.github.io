import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  characterListRecoil,
  characterSelector,
  isRebootRecoil,
} from "../../../constants/recoil";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { bossList } from "../../../../pages/crystal_calculator";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useMemo } from "react";
import { getTotalPrice } from "./crystalCalculator";
import Boss from "./boss";

type Props = {
  idx: number;
};

export function Character({ idx }: Props) {
  const isReboot = useRecoilValue(isRebootRecoil);
  const character = useRecoilValue(characterSelector(idx));
  const setCharacterList = useSetRecoilState(characterListRecoil);

  const characterName = useMemo(
    () => "캐릭터 " + (idx + 1) /*character?.[0]*/,
    [idx]
  );
  const totalPrice = useMemo(
    () => getTotalPrice(character?.[1], isReboot),
    [character, isReboot]
  );

  const removeCharacter = useCallback(
    () =>
      confirm(`정말로 삭제하시겠습니까?\n삭제될 캐릭터 : ${characterName}`) &&
      setCharacterList(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]),
    [characterName, idx, setCharacterList]
  );

  if (!character) return null;

  return (
    <Container>
      <HeaderWrapper>
        <Typography>{characterName}</Typography>
        <IconButton color={"error"} onClick={removeCharacter}>
          <DeleteIcon />
        </IconButton>
      </HeaderWrapper>
      <Divider />
      <Grid container p={1} spacing={1} overflow={"auto"}>
        {bossList.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2} pt={1}>
            <Boss i={i} idx={idx} item={item} />
          </Grid>
        ))}
      </Grid>
      <Divider />
      <FooterWrapper>
        <Typography>총 주간 수익</Typography>
        <Typography>{totalPrice.toLocaleString()}</Typography>
        <Typography>총 사냥 보스</Typography>
        <Typography>{character[1].filter(_ => _.checked).length}</Typography>
      </FooterWrapper>
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

const HeaderWrapper = styled.div`
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
  align-items: center;
`;

const FooterWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto 1fr;
  gap: 8px;
  padding: 0 8px 8px;
`;
