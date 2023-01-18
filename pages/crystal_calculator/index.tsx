import styled from "@emotion/styled";
import CrystalCalculator from "../../src/components/maplestory/crystalCalculator/crystalCalculator";
import { crystalPriceListType } from "../../src/constants/types";

export default function CrystalCalculatorIndex() {
  return (
    <Container>
      <CrystalCalculator />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const crystalPriceList: crystalPriceListType = [
  { type: "일일", difficulty: "이지", boss: "자쿰", price: 119835 },
  { type: "일일", difficulty: "노멀", boss: "자쿰", price: 366997 },
  { type: "일일", difficulty: "이지", boss: "파풀라투스", price: 410135 },
  { type: "일일", difficulty: "이지", boss: "매그너스", price: 432605 },
  { type: "일일", difficulty: "노멀", boss: "힐라", price: 479343 },
  { type: "일일", difficulty: "이지", boss: "혼테일", price: 528474 },
  { type: "일일", difficulty: "노멀", boss: "블러디퀸", price: 580003 },
  { type: "일일", difficulty: "노멀", boss: "반반", price: 580003 },
  { type: "일일", difficulty: "노멀", boss: "피에르", price: 580003 },
  { type: "일일", difficulty: "노멀", boss: "벨룸", price: 580003 },
  { type: "일일", difficulty: "노멀", boss: "혼테일", price: 606666 },
  { type: "일일", difficulty: "이지", boss: "반 레온", price: 633927 },
  { type: "일일", difficulty: "이지", boss: "아카이럼", price: 690249 },
  { type: "일일", difficulty: "노멀", boss: "카웅", price: 748970 },
  { type: "일일", difficulty: "카오스", boss: "혼테일", price: 810086 },
  { type: "일일", difficulty: "노멀", boss: "핑크빈", price: 841544 },
  { type: "일일", difficulty: "노멀", boss: "반 레온", price: 873601 },
  { type: "일일", difficulty: "하드", boss: "반 레온", price: 1467984 },
  { type: "일일", difficulty: "노멀", boss: "아카이럼", price: 1510227 },
  { type: "일일", difficulty: "노멀", boss: "매그너스", price: 1553066 },
  { type: "일일", difficulty: "노멀", boss: "파풀라투스", price: 1596506 },
  { type: "주간", difficulty: "이지", boss: "시그너스", price: 5496394 },
  { type: "주간", difficulty: "하드", boss: "힐라", price: 6936489 },
  { type: "주간", difficulty: "카오스", boss: "핑크빈", price: 7923110 },
  { type: "주간", difficulty: "노멀", boss: "시그너스", price: 9039130 },
  { type: "주간", difficulty: "카오스", boss: "자쿰", price: 9741285 },
  { type: "주간", difficulty: "카오스", boss: "블러디퀸", price: 9806780 },
  { type: "주간", difficulty: "카오스", boss: "반반", price: 9818154 },
  { type: "주간", difficulty: "카오스", boss: "피에르", price: 9838932 },
  { type: "주간", difficulty: "하드", boss: "매그너스", price: 11579023 },
  { type: "주간", difficulty: "카오스", boss: "벨룸", price: 12590202 },
  { type: "주간", difficulty: "카오스", boss: "파풀라투스", price: 26725937 },
  { type: "주간", difficulty: "노멀", boss: "스우", price: 33942566 },
  { type: "주간", difficulty: "노멀", boss: "데미안", price: 35517853 },
  {
    type: "주간",
    difficulty: "노멀",
    boss: "가디언 엔젤 슬라임",
    price: 46935874,
  },
  { type: "주간", difficulty: "이지", boss: "루시드", price: 48058319 },
  { type: "주간", difficulty: "이지", boss: "윌", price: 52139127 },
  { type: "주간", difficulty: "노멀", boss: "루시드", price: 57505626 },
  { type: "주간", difficulty: "노멀", boss: "윌", price: 66311463 },
  { type: "주간", difficulty: "노멀", boss: "더스크", price: 71054562 },
  { type: "주간", difficulty: "노멀", boss: "듄켈", price: 76601412 },
  { type: "주간", difficulty: "하드", boss: "데미안", price: 112480613 },
  { type: "주간", difficulty: "하드", boss: "스우", price: 118294192 },
  { type: "주간", difficulty: "하드", boss: "루시드", price: 131095655 },
  { type: "주간", difficulty: "하드", boss: "윌", price: 145038483 },
  { type: "주간", difficulty: "노멀", boss: "진 힐라", price: 148112376 },
  {
    type: "주간",
    difficulty: "카오스",
    boss: "가디언 엔젤 슬라임",
    price: 155492141,
  },
  { type: "주간", difficulty: "카오스", boss: "더스크", price: 160173752 },
  { type: "주간", difficulty: "하드", boss: "듄켈", price: 168609280 },
  { type: "주간", difficulty: "하드", boss: "진 힐라", price: 190159452 },
  { type: "주간", difficulty: "노멀", boss: "선택받은 세렌", price: 196904752 },
  { type: "주간", difficulty: "하드", boss: "선택받은 세렌", price: 267825621 },
  {
    type: "주간",
    difficulty: "카오스",
    boss: "감시자 칼로스",
    price: 300000000,
  },
  {
    type: "주간",
    difficulty: "익스트림",
    boss: "선택받은 세렌",
    price: 1071302484,
  },
  { type: "월간", difficulty: "하드", boss: "검은 마법사", price: 1418809857 },
  {
    type: "월간",
    difficulty: "익스트림",
    boss: "검은 마법사",
    price: 5675239428,
  },
];
