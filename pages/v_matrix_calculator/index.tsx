import styled from "@emotion/styled";
import VMatrixCalculator from "../../components/maplestory/vMatrixCalculator/vMatrixCalculator";
import { JobListType } from "../../constants/types";

export default function VMatrixCalculatorIndex() {
  return (
    <Container>
      <VMatrixCalculator />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const jobList: JobListType = {
  나이트로드: [
    "다크 플레어",
    "마크 오브 어쌔신/나이트로드",
    "쿼드러플 스로우",
    "써든레이드",
    "쇼다운 챌린지",
    "포 시즌",
    "슈리켄 버스트",
    "윈드 탈리스만",
    "트리플 스로우",
    "슈리켄 챌린지",
  ],
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
    "샤이닝 피어스",
    "소울 어썰트",
    "소울 릴리즈",
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
  은월: [
    "폭류권",
    "귀참과 진 귀참",
    "소혼 장막",
    "여우령/불여우령",
    "정령의 화신",
    "섬권",
    "파력권",
    "파쇄철조-하",
    "파쇄철조-전",
    "통백권",
    "파쇄철조-회",
    "속박술",
    "환령 강신",
    "사혼 각인",
    "분혼 격참",
  ],
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
