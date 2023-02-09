import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { bossList, colorPrefers, findMatch } from "../../../constants/crystalCalculator";
import useCharacterList from "../../../hooks/useCharacterList";
import styled from "@emotion/styled";

export default function SummaryBoss() {
  const { characterList } = useCharacterList();

  return (
    <Container>
      <TableContainer sx={{ height: "100%", overflow: "auto" }}>
        <Table stickyHeader sx={{ m: "auto", p: "0 8px", width: "auto" }}>
          <TableHead>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align={"center"} sx={{ maxWidth: 180 }}></TableCell>
              {characterList.map((item, i) => (
                <TableCell key={i} align={"center"} sx={{ whiteSpace: "nowrap" }}>
                  {item[0]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bossList.map((item, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    position: "sticky",
                    left: 0,
                    bgcolor: colorPrefers.find(_ => _.str === item.difficulty)?.bgcolor,
                    color: colorPrefers.find(_ => _.str === item.difficulty)?.color,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.difficulty} {item.name}
                </TableCell>
                {characterList.map((_, j) => (
                  <TableCell key={j} align={"center"}>
                    {_[1].find(__ => __.checked && findMatch(__, item)) && "O"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow: hidden;

  & [role="number"] {
    font-family: Consolas, sans-serif !important;
    text-align: right;
  }
`;
