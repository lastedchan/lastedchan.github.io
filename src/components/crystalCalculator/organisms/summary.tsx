import { useRecoilValue } from "recoil";
import { Dispatch, Fragment, SetStateAction } from "react";
import { Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import useCharacterList from "../../../hooks/useCharacterList";
import { characterListRecoil, isRebootRecoil } from "../../../recoils/crystalCalculator";
import { getTotalCount, getTotalPrice } from "../../../constants/crystalCalculator";
import AdWrapper from "../../common/molcules/adWrapper";

type Props = {
  setTab: Dispatch<SetStateAction<number>>;
};
export default function Summary({ setTab }: Props) {
  const isReboot = useRecoilValue(isRebootRecoil);
  const characterList = useRecoilValue(characterListRecoil);

  const { totalPrice, totalCount } = useCharacterList();

  return (
    <Container>
      <AdWrapper />
      <Wrapper>
        <Typography textAlign={"center"}>닉네임</Typography>
        <Typography textAlign={"center"}>수량</Typography>
        <Typography textAlign={"center"}>메소</Typography>
        {characterList.map((item, i) => (
          <Fragment key={i}>
            <Typography onClick={() => setTab(i + 1)}>{item[0]}</Typography>
            <Typography role={"number"}>{getTotalCount(item[1])}</Typography>
            <Typography role={"number"}>{getTotalPrice(item[1], isReboot).toLocaleString()}</Typography>
          </Fragment>
        ))}
        <Divider sx={{ gridColumn: "1 / -1" }} />
        <Typography>총</Typography>
        <Typography role={"number"}>{totalCount}</Typography>
        <Typography textAlign={"right"} role={"number"}>
          {totalPrice.toLocaleString()}
        </Typography>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  padding: 8px 16px;
  width: 480px;
  max-width: 100%;
  justify-content: center;

  & [role="number"] {
    font-family: Consolas, sans-serif !important;
    text-align: right;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 110px auto auto;
  justify-content: space-between;
  gap: 4px 8px;
`;