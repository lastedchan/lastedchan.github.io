import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type Props = {
  coreList: string[];
  setMyCoreList: Dispatch<SetStateAction<string[][]>>;
};

export default function MyCoreGenerator({ coreList, setMyCoreList }: Props) {
  const [selectedCoreList, setSelectedCoreList] = useState<string[]>([]);

  const toggleSelectCore = (item: string) => {
    const idx = selectedCoreList.findIndex(_ => _ == item);
    if (idx !== -1) {
      setSelectedCoreList(prev =>
        prev.reduce(
          (prev: string[], item, i) => (i !== idx ? [...prev, item] : prev),
          []
        )
      );
    } else if (selectedCoreList.length < 3) {
      setSelectedCoreList(prev => [...prev, item]);
    }
  };

  const addMyCoreList = useCallback(() => {
    if (selectedCoreList.length === 3) {
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
            variant={
              selectedCoreList.find(_ => _ === item) ? "contained" : "outlined"
            }
            color={
              !selectedCoreList.findIndex(_ => _ === item) ? "info" : "primary"
            }
            onClick={() => toggleSelectCore(item)}
          >
            <Typography>
              {!selectedCoreList.findIndex(_ => _ == item) ? "[1]" : ""}
              {item}
            </Typography>
          </Button>
        ))}
      </ButtonContainer>
      <Button variant={"contained"} onClick={addMyCoreList}>
        추가
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0;
  gap: 4px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  & p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
