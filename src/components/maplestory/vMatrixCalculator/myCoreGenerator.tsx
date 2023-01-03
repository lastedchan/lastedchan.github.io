import styled from "@emotion/styled";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import _ from "lodash";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  coreList: string[];
  setMyCoreList: Dispatch<SetStateAction<string[][]>>;
};

export default function MyCoreGenerator({ coreList, setMyCoreList }: Props) {
  const [selectedCoreList, setSelectedCoreList] = useState<string[]>([]);
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => setSelectedCoreList([]), [coreList]);
  useEffect(
    () =>
      setIdx(prev => {
        const empty = selectedCoreList.findIndex(_ => _ === "");
        return empty !== -1 ? empty : (prev + 1) % 3;
      }),
    [selectedCoreList]
  );

  const selectCore = useCallback(
    (item: string) => {
      setSelectedCoreList(prev => [
        ...(prev.length ? prev : ["", "", ""]).slice(0, idx),
        item,
        ...(prev.length ? prev : ["", "", ""]).slice(idx + 1),
      ]);
    },
    [idx]
  );
  const unselectCore = useCallback(
    (i: number) =>
      setSelectedCoreList(prev => [
        ...prev.slice(0, i),
        "",
        ...prev.slice(i + 1),
      ]),
    []
  );

  const addMyCoreList = useCallback(() => {
    if (selectedCoreList.filter(_ => _).length === 3) {
      setMyCoreList(prev => [...prev, selectedCoreList]);
      setSelectedCoreList([]);
    } else alert("스킬을 3개 선택해주세요.");
  }, [selectedCoreList, setMyCoreList]);

  return (
    <Container>
      <ButtonContainer>
        {coreList.map(item => (
          <Button
            key={item}
            variant={"outlined"}
            onClick={() => selectCore(item)}
            disabled={!!selectedCoreList.find(_ => _ === item)}
          >
            <Typography>{item}</Typography>
          </Button>
        ))}
      </ButtonContainer>
      <Box display={"flex"} flexDirection={"row"} gap={1}>
        {_.range(0, 3).map(i => (
          <CoreItem key={i} elevation={i === idx ? 12 : 1}>
            <IconButton
              size={"small"}
              color={"error"}
              onClick={() => unselectCore(i)}
            >
              <HighlightOffIcon />
            </IconButton>
            <Typography onClick={() => setIdx(i)}>
              {selectedCoreList[i]}
            </Typography>
          </CoreItem>
        ))}
      </Box>
      <Button variant={"contained"} onClick={addMyCoreList}>
        추가
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  max-height: 210px;
  overflow: auto;
  & p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const CoreItem = styled(Paper)`
  display: flex;
  flex: 1 100%;
  gap: 4px;
  padding: 8px 4px;
  align-items: center;
  overflow: hidden;
  & p {
    flex: 1;
    height: 1.5rem;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
