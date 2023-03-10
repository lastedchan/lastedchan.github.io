import styled from "@emotion/styled";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as gtag from "../../libs/gtag";
import { coreListRecoil, jobRecoil } from "../../recoils/vMatrixCalculator";
import { jobList } from "../../constants/vMatrixCalculator";

export default function CoreGenerator() {
  const job = useRecoilValue(jobRecoil);
  const setCoreList = useSetRecoilState(coreListRecoil(job));
  const [selectedCoreList, setSelectedCoreList] = useState(["", "", ""]);
  const [idx, setIdx] = useState<number>(0);
  const coreList = useMemo(() => jobList[job], [job]);

  useEffect(() => setSelectedCoreList(["", "", ""]), [job]);
  useEffect(
    () =>
      setIdx(prev => {
        const empty = selectedCoreList.findIndex(_ => _ === "");
        return empty !== -1 ? empty : prev;
      }),
    [selectedCoreList]
  );

  const selectCore = (item: string) => setSelectedCoreList(prev => [...prev.slice(0, idx), item, ...prev.slice(idx + 1)]);
  const unselectCore = (i: number) => setSelectedCoreList(prev => [...prev.slice(0, i), "", ...prev.slice(i + 1)]);

  const addCoreList = () => {
    if (selectedCoreList.filter(_ => _).length === 3) {
      gtag.event({
        action: "vmc_add_core",
        category: job,
        label: JSON.stringify(selectedCoreList),
        value: String(coreList.length + 1),
      });
      setSelectedCoreList(["", "", ""]);
      setCoreList(prev => [...prev, selectedCoreList]);
    } else alert("스킬을 3개 선택해주세요.");
  };

  return (
    <Container>
      <ButtonContainer>
        {coreList?.map(item => (
          <Button key={item} variant={"outlined"} onClick={() => selectCore(item)} disabled={!!selectedCoreList.find(_ => _ === item)}>
            <Typography>{item}</Typography>
          </Button>
        ))}
      </ButtonContainer>
      <Box display={"flex"} flexDirection={"row"} gap={1}>
        {_.range(0, 3).map(i => (
          <CoreItem key={i} elevation={i === idx ? 12 : 1}>
            <IconButton size={"small"} color={"error"} onClick={() => unselectCore(i)}>
              <HighlightOffIcon />
            </IconButton>
            <Typography onClick={() => setIdx(i)}>{selectedCoreList[i]}</Typography>
          </CoreItem>
        ))}
      </Box>
      <Button variant={"contained"} onClick={addCoreList}>
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
