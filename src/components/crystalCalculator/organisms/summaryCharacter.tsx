import { Fragment, useMemo, useState } from "react";
import { Box, Checkbox, Collapse, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import useCharacterList from "../../../hooks/useCharacterList";
import AdWrapper from "../../common/molcules/adWrapper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { bossList, findMatch } from "../../../constants/crystalCalculator";
import { HuntedBossType } from "../../../types/crystalCalculator";
import { useRecoilValue } from "recoil";
import { isRebootRecoil } from "../../../recoils/crystalCalculator";
import { sum } from "lodash";

type Props = {
  goCharacter: (idx: number) => void;
};

export default function SummaryCharacter({ goCharacter }: Props) {
  const isReboot = useRecoilValue(isRebootRecoil);
  const { characterList, character, totalPrice, totalCount } = useCharacterList();
  const [openCharacter, setOpenCharacter] = useState<boolean[]>(characterList.map(() => false));

  const allHunted = (item: HuntedBossType[]) => !item.find(_ => _.checked && !_.hunted);
  const balanceList = useMemo(
    () =>
      characterList.map(
        (_, i) =>
          character(i).totalPrice -
          _[1].reduce(
            (prev, __) =>
              prev +
              (__.checked && __.hunted
                ? Math.floor(((bossList.find(boss => findMatch(__, boss))?.price ?? 0) * (isReboot ? 5 : 1)) / (__.headcount ?? 1))
                : 0),
            0
          )
      ),
    [character, characterList, isReboot]
  );

  return (
    <Container>
      <Table>
        <Row stickyheader sx={{ bgcolor: "background.default", zIndex: 10 }}>
          <Cell />
          <Cell></Cell>
          <Cell textAlign={"left"}>닉네임</Cell>
          <Cell textAlign={"right"}>수량</Cell>
          <Cell textAlign={"right"}>메소</Cell>
        </Row>
        {characterList.map((item, i) => (
          <Fragment key={i}>
            <Row>
              <Cell>
                <IconButton onClick={() => setOpenCharacter(prev => [...prev.slice(0, i), !prev[i], ...prev.slice(i + 1)])}>
                  {openCharacter[i] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Cell>
              <Cell>
                <Checkbox checked={allHunted(item[1])} onChange={(e, v) => character(i).setBossHunted(v)} />
              </Cell>
              <Cell onClick={() => goCharacter(i)}>{item[0]}</Cell>
              <Cell role={"number"}>{character(i).totalCount}</Cell>
              <Cell role={"number"}>
                <p style={{ margin: 0, textDecoration: balanceList[i] !== character(i).totalPrice ? "line-through" : "" }} role={"number"}>
                  {character(i).totalPrice.toLocaleString()}
                </p>
                {balanceList[i] !== character(i).totalPrice && balanceList[i].toLocaleString()}
              </Cell>
            </Row>
            <Collapse in={openCharacter[i]}>
              {item[1].map((boss, j) =>
                boss.checked ? (
                  <Row key={j}>
                    <Cell>
                      <Checkbox checked={boss.hunted} onChange={(e, v) => character(i).setBossHunted(v, j)} />
                    </Cell>
                    <Cell sx={{ gridColumn: "2 / -2" }}>
                      {boss.difficulty} {boss.name} ({boss.headcount ?? 1}인)
                    </Cell>
                    <Cell role={"number"} sx={{ textDecoration: boss.hunted ? "line-through" : "" }}>
                      {Math.floor(
                        ((bossList.find(_ => findMatch(boss, _))?.price ?? 0) * (isReboot ? 5 : 1)) / (boss.headcount ?? 1)
                      ).toLocaleString()}
                    </Cell>
                  </Row>
                ) : null
              )}
            </Collapse>
          </Fragment>
        ))}
        <Row stickyfooter sx={{ bgcolor: "background.default", borderTop: "1px solid", borderColor: "divider" }}>
          <Cell gridColumn={"1/ 3"} />
          <Cell role={"number"}>{totalCount}</Cell>
          <Cell role={"number"}>
            <p style={{ margin: 0, textDecoration: sum(balanceList) !== totalPrice ? "line-through" : "" }} role={"number"}>
              {totalPrice.toLocaleString()}
            </p>
            {sum(balanceList) !== totalPrice && sum(balanceList).toLocaleString()}
          </Cell>
        </Row>
      </Table>
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
  overflow: auto;

  & [role="number"] {
    font-family: Consolas, sans-serif !important;
    text-align: right;
  }
`;

const Table = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled(Box)<{ stickyheader?: boolean; stickyfooter?: boolean }>`
  position: ${_ => (_.stickyheader || _.stickyfooter ? "sticky" : "")};
  ${_ => (_.stickyheader ? `top: 0;` : _.stickyfooter ? `bottom: 0;` : "")}
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 53px 53px 1fr auto 120px;
  padding: 0 8px;
  min-height: 55px;
  justify-content: center;
  align-items: center;
`;
const Cell = styled(Box)`
  padding: 8px;
  font-size: 0.875rem;
`;
