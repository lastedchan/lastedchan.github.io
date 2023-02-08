import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { Divider, Grid } from "@mui/material";
import Boss from "../molcules/boss";
import { characterSelector } from "../../../recoils/crystalCalculator";
import { bossList } from "../../../constants/crystalCalculator";
import AdWrapper from "../../common/molcules/adWrapper";
import CharacterToolbar from "../molcules/characterToolbar";
import CharacterFooter from "../molcules/characterFooter";

export type Props = {
  idx: number;
};

export function Character({ idx }: Props) {
  const character = useRecoilValue(characterSelector(idx));

  if (!character) return null;

  return (
    <Container>
      <CharacterToolbar idx={idx} />
      <Divider />
      <AdWrapper />
      <Grid container p={1} spacing={1} overflow={"auto"}>
        {bossList.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2} pt={1}>
            <Boss i={i} idx={idx} item={item} />
          </Grid>
        ))}
      </Grid>
      <Divider />
      <CharacterFooter idx={idx} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
