import { useRecoilValue } from "recoil";
import { characterListRecoil, isRebootRecoil } from "../../../constants/recoil";
import { useMemo } from "react";
import { getTotalPrice } from "./crystalCalculator";
import { Box, Divider, Typography } from "@mui/material";
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

  return (
    <Container>
      {characterList.map((item, i) => (
        <Box key={i} display={"flex"} justifyContent={"space-between"}>
          <Typography>{item[0]}</Typography>
          <Typography role={"total-price"}>
            {getTotalPrice(item[1], isReboot).toLocaleString()}
          </Typography>
        </Box>
      ))}
      <Divider />
      <Typography textAlign={"right"} role={"total-price"}>
        {totalPrice.toLocaleString()}
      </Typography>
    </Container>
  );
}

const Container = styled.div`
  padding: 8px 16px;
  & [role="total-price"] {
    font-family: Consolas, sans-serif !important;
  }
`;
