import { useRecoilValue } from "recoil";
import { characterListRecoil, isRebootRecoil } from "../../../constants/recoil";
import { Fragment, useMemo } from "react";
import { getTotalCrystal, getTotalPrice } from "./crystalCalculator";
import { Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";

export default function Summary() {
  const isReboot = useRecoilValue(isRebootRecoil);
  const characterList = useRecoilValue(characterListRecoil);

  const totalPrice = useMemo(
    () =>
      characterList.reduce(
        (prev, character) => prev + getTotalPrice(character[1], isReboot),
        0
      ),
    [characterList, isReboot]
  );
  const totalCrystal = useMemo(
    () =>
      characterList.reduce(
        (prev, character) => prev + getTotalCrystal(character[1]),
        0
      ),
    [characterList]
  );

  return (
    <Container>
      <Wrapper>
        <Typography textAlign={"center"}>닉네임</Typography>
        <Typography textAlign={"center"}>수량</Typography>
        <Typography textAlign={"center"}>메소</Typography>
        {characterList.map((item, i) => (
          <Fragment key={i}>
            <Typography>{item[0]}</Typography>
            <Typography role={"number"}>{getTotalCrystal(item[1])}</Typography>
            <Typography role={"number"}>
              {getTotalPrice(item[1], isReboot).toLocaleString()}
            </Typography>
          </Fragment>
        ))}
        <Divider sx={{ gridColumn: "1 / -1" }} />
        <Typography>총</Typography>
        <Typography role={"number"}>{totalCrystal}</Typography>
        <Typography textAlign={"right"} role={"number"}>
          {totalPrice.toLocaleString()}
        </Typography>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 8px 16px;
  & [role="number"] {
    font-family: Consolas, sans-serif !important;
    text-align: right;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 90px auto auto;
  justify-content: space-between;
  gap: 4px 8px;
`;
