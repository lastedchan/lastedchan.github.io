import { Dispatch, SetStateAction } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styled from "@emotion/styled";
import useCharacterList from "../../../hooks/useCharacterList";
import AdWrapper from "../../common/molcules/adWrapper";

type Props = {
  setTab: Dispatch<SetStateAction<number>>;
};
export default function SummaryCharacter({ setTab }: Props) {
  const { characterList, character, totalPrice, totalCount } = useCharacterList();

  return (
    <Container>
      <TableContainer sx={{ height: "100%", overflow: "auto" }}>
        <Table stickyHeader sx={{ m: "auto", maxWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell align={"left"}>닉네임</TableCell>
              <TableCell align={"right"}>수량</TableCell>
              <TableCell align={"right"}>메소</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characterList.map((item, i) => (
              <TableRow key={i}>
                <TableCell onClick={() => setTab(i + 1)}>{item[0]}</TableCell>
                <TableCell role={"number"}>{character(i).totalCount}</TableCell>
                <TableCell role={"number"}>{character(i).totalPrice.toLocaleString()}</TableCell>
                <Box gridColumn={"1 / -1"}></Box>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>총</TableCell>
              <TableCell role={"number"}>{totalCount}</TableCell>
              <TableCell align={"right"} role={"number"}>
                {totalPrice.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AdWrapper />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow: auto;

  & [role="number"] {
    font-family: Consolas, sans-serif !important;
    text-align: right;
  }
`;
