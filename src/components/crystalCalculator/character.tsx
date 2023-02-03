import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import {
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Boss from "./boss";
import useCharacterList from "./useCharacterList";
import { characterSelector } from "../../recoils/crystal_calculator";
import AdWrapper from "../adWrapper";
import { bossList } from "../../constants/crystalCalculator";

type Props = {
  idx: number;
};

export function Character({ idx }: Props) {
  const character = useRecoilValue(characterSelector(idx));

  const {
    characterName,
    totalPrice,
    removeCharacter,
    copyCharacter,
    changeName,
  } = useCharacterList().character(idx);

  if (!character) return null;

  return (
    <Container>
      <HeaderWrapper>
        <ButtonGroup sx={{ gap: 0.5, alignItems: "center" }}>
          <Typography pr={1}>{characterName}</Typography>
          <IconButton onClick={changeName}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={copyCharacter}>
            <ContentCopyIcon />
          </IconButton>
        </ButtonGroup>
        <IconButton onClick={removeCharacter}>
          <DeleteIcon color={"error"} />
        </IconButton>
      </HeaderWrapper>
      <Divider />
      <AdWrapper>
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-8583770780355894"
          data-ad-slot="4169298389"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </AdWrapper>
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
