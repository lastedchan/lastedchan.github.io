import styled from "@emotion/styled";
import {
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function VMatrixCalculatorIndex() {
  const [job, setJob] = useState(10);
  const [needs, setNeeds] = useState<boolean[]>([]);

  useEffect(() => {
    setNeeds(Object.values(jobList)[job].map(() => false));
  }, [job]);

  const onJobChange = (e: SelectChangeEvent) => setJob(Number(e.target.value));
  const toggleNeeds = (need: number) =>
    setNeeds(prev => [
      ...prev.slice(0, need),
      !prev[need],
      ...prev.slice(need + 1),
    ]);

  return (
    <Container>
      <FormControl fullWidth>
        <Select displayEmpty onChange={onJobChange}>
          <MenuItem>직업 선택</MenuItem>
          {Object.keys(jobList).map((job, i) => (
            <MenuItem key={i} value={i}>
              {job}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ButtonGroup>
        {job !== -1 && Object.values(jobList)[job].length ? (
          Object.values(jobList)[job]?.map((item, i) => (
            <Button
              key={item}
              onClick={() => toggleNeeds(i)}
              variant={needs[i] ? "contained" : "outlined"}
            >
              {item}
            </Button>
          ))
        ) : (
          <span>직업을 선택해주세요.</span>
        )}
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const jobList = {
  나이트로드: [],
  나이트워커: [],
  다크나이트: [],
  데몬슬레이어: [],
  데몬어벤져: [],
  듀얼블레이드: [],
  라라: [],
  루미너스: [],
  메르세데스: [],
  메카닉: [],
  미하일: [
    "샤이닝 크로스",
    "로얄 가드/오펜시브 디펜스",
    "인스톨 실드/소울 마제스티",
    "데들리 차지",
    "파이널 어택",
    "샤이닝 체이스/버티컬 샤이닝 체이스",
    "잡1",
    "잡2",
    "잡3",
  ],
  바이퍼: [],
  배틀메이지: [],
  보우마스터: [],
  블래스터: [],
  비숍: [],
  섀도어: [],
  소울마스터: [],
  스트라이커: [],
  신궁: [],
  아델: [],
  아란: [],
  아크: [],
  "아크메이지(불,독)": [],
  "아크메이지(썬,콜)": [],
  에반: [],
  엔젤릭버스터: [],
  와일드헌터: [],
  윈드브레이커: [],
  은월: [],
  일리움: [],
  제논: [],
  제로: [],
  카데나: [],
  카이저: [],
  카인: [],
  캐논슈터: [],
  캡틴: [],
  키네시스: [],
  팔라딘: [],
  패스파인더: [],
  팬텀: [],
  플레임위자드: [],
  호영: [],
  히어로: [],
};
