import styled from "@emotion/styled";
import VMatrixCalculator from "../../src/components/maplestory/vMatrixCalculator/vMatrixCalculator";
import { JobListType } from "../../src/constants/types";

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
  나이트워커: [
    "쉐도우 배트/래버너스 배트",
    "퀸터플 스로우",
    "다크니스 오멘",
    "럭시 세븐",
    "트리플 스로우",
    "쿼드러플 스로우",
    "스타더스트",
    "쉐도우 스티치",
    "도미니언",
  ],
  다크나이트: [
    "비홀더 강화",
    "다크 임페일",
    "궁니르 디센트",
    "파이널 어택",
    "스피어 풀링",
    "라만차 스피어",
    "리프 어택/돌진/어퍼 차지",
    "다크 신서시스",
  ],
  데몬슬레이어: [
    "데몬 슬래시",
    "데몬 임팩트",
    "데몬 익스플로전",
    "데빌 크라이",
    "메타모포시스",
    "서버러스",
    "데빌 사이더",
    "소울 이터",
    "다크 쓰러스트",
    "데몬 트레이스",
    "다크 저지먼트",
    "데쓰 드로우",
    "블러디 레이븐",
    "데모닉 브레스",
    "다크 바인드",
  ],
  데몬어벤져: [
    "익시드 : 문라이트 슬래시",
    "익시드 : 엑스큐션",
    "실드 체이싱",
    "사우전드 소드",
    "인핸스드 익시드",
    "배츠 스웜",
    "익시드 : 더블 슬래시",
    "익시드 : 데몬 스트라이크",
    "실드 차지",
    "인헤일 바이탈러티",
    "아머 브레이크",
    "블러디 임프리즌",
  ],
  듀얼블레이드: [
    "블레이드 퓨리",
    "팬텀 블로우",
    "아수라",
    "히든 블레이드",
    "블레이드 어센션",
    "써든레이드",
    "샤프 슬래시",
    "토네이도 스핀",
    "페이탈 블로우",
    "슬래시 스톰",
    "플래시 뱅",
    "플라잉 어썰터",
    "블러디 스톰",
    "사슬지옥",
    "파이널 컷",
    "써든레이드",
  ],
  라라: [
    "정기뿌리기",
    "용맥 분출",
    "용맥 흡수",
    "잠 깨우기",
    "산 꼬마",
    "산의 씨앗",
    "넝쿨 타래",
    "용맥의 자취",
  ],
  루미너스: [
    "라이트 리플렉션",
    "아포칼립스",
    "앱솔루트 킬",
    "녹스피어",
    "데스 사이드",
    "모닝 스타폴",
    "트윙클 플래시",
    "다크 폴링",
    "실피드 랜서",
    "보이드 프레셔",
    "스펙트럴 라이트",
    "샤인 리뎀션",
    "아마겟돈",
  ],
  메르세데스: [
    "스트라이크 듀얼샷/파이널 어택 : 듀얼보우건",
    "리프 토네이도/거스트 다이브",
    "이슈타르의 링",
    "유니콘 스파이크",
    "엘리멘탈 나이트",
    "레전드리 스피어",
    "래쓰 오브 엔릴",
    "차지 드라이브/파이널 샷/하이킥 데몰리션/롤링 문썰트",
    "스피드 듀얼샷/크로스 피어싱",
    "라이트닝 엣지",
  ],
  메카닉: [
    "호밍 미사일",
    "로봇 런처 : RM7",
    "마그네틱 필드",
    "로봇 팩토리 : RM1",
    "매시브 파이어 SPLASH-F/IRON-B",
    "디스토션 필드",
    "드릴 러쉬",
    "개틀링 샷",
    "로켓 부스터",
    "어드밴스드 개틀링 샷",
    "로켓 펀치",
    "매시브 파이어 SPLASH/IRON",
    "서포트 웨이버 : H-EX",
    "워머신 : 타이탄",
  ],
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
  바이퍼: [
    "피스트 인레이지",
    "씨 서펜트 인레이지/서펜트 어썰트 인레이지",
    "전함 노틸러스",
    "훅 봄버",
    "씨 서펜트 버스트/서펜트 어썰트",
    "스크류 펀치",
    "쇼크 웨이브",
    "터닝 킥",
  ],
  배틀메이지: [
    "데스",
    "다크 라이트닝",
    "피니쉬 블로우",
    "배틀 스퍼트",
    "다크 제네시스",
    "배틀킹 바",
    "트리플 블로우",
    "다크 체인",
    "쿼드 블로우",
    "데스 블로우",
  ],
  보우마스터: [
    "폭풍의 시",
    "퀴버 카트리지",
    "애로우 플래터/플레시 미라주",
    "언카운터블 애로우",
    "파이널 어택 : 활",
    "피닉스",
    "윈드 오브 프레이",
    "애로우 블로우",
    "바람의 시",
    "리트리트 샷",
  ],
  블래스터: [
    "매그넘 펀치",
    "더블 팡",
    "쇼크 웨이브 펀치",
    "리볼빙 캐논/리볼빙 캐논 마스터리",
    "릴리즈 파일 벙커",
    "해머 스매시",
    "익스플로젼 무브",
    "리프트 프레스/매그넘 캐논",
    "플래시 무브",
    "허리케인 믹서",
    "리볼빙 벙커",
    "하이퍼 매그넘 펀치",
  ],
  비숍: [
    "빅뱅",
    "엔젤레이",
    "제네시스/트라이엄프 페더",
    "헤븐즈 도어/파운틴 포 엔젤",
    "바하뮤트",
    "힐/엔젤릭 터치",
    "홀리 애로우",
    "샤이닝 레이",
  ],
  섀도어: [
    "암살",
    "크루얼 스탭",
    "메소 익스플로젼",
    "다크 플레어",
    "써든레이드",
    "베일 오브 새도우",
    "새비지 블로우",
    "엣지 카니발",
    "무스펠 하임",
  ],
  소울마스터: [
    "솔라 슬래시/루나 디바이드",
    "코스믹 샤워",
    "코스믹 버스트",
    "라우드 러쉬/사일런트 무브",
    "솔루나 슬래시",
    "블레이징 어썰트/러스터 차지",
    "코스믹 매터",
    "소울 퍼네트레이션",
  ],
  스트라이커: [
    "섬멸",
    "벽력",
    "질풍/태풍",
    "뇌성",
    "승천",
    "파도/해파",
    "회축",
    "해신강림",
    "충아",
    "섬광",
  ],
  신궁: [
    "피어싱/인핸스 피어싱",
    "스나이핑/인핸스 스나이핑",
    "볼트 스위프트/프리져",
    "롱 레인지 트루샷/애로우 일루전",
    "애로우 블로우",
    "리트리트 샷",
    "파이널 어택 : 석궁",
  ],
  아델: [
    "샤드/원더",
    "테리토리/트레드",
    "디바이드",
    "오더/그레이브",
    "크리에이션/게더링",
    "블로섬/스콜",
    "임페일/레조넌스/마커",
    "플레인",
    "크로스",
    "펀토",
  ],
  아란: [
    "파이널 블로우",
    "비욘더",
    "부스트 엔드 - 헌터즈 타겟팅",
    "스매쉬 스윙/에어로 스윙",
    "파이널 어택",
    "마하의 영역",
    "스매쉬 웨이브",
    "파이널 차지",
    "파이널 토스",
    "게더링 캐쳐",
    "롤링 스핀",
    "저지먼트",
    "부스트 엔드 - 스톰 오브 피어",
  ],
  아크: [
    "플레인 차지드라이브",
    "잊혀지지 않는 악몽/흉몽",
    "다가오는 죽음/돌아오는 증오",
    "거스트 차지드라이브/채워지지 않는 굶주림",
    "기어 다니는 공포/황홀한 구속/끝없는 고통",
    "어비스 차지드라이브/걷잡을 수 없는 혼돈",
    "스칼렛 차지드라이브/지워지지 않는 상처",
    "멈출 수 없는 충동/멈출 수 없는 본능",
  ],
  "아크메이지(불,독)": [
    "텔레포스 마스터리/포이즌 리젼",
    "플레임 스윕",
    "미스트 이럽션",
    "이그나이트",
    "플레임 헤이즈",
    "메테오",
    "파이어 오라",
    "메기도 플레임",
    "이프리트",
    "플레임 오브",
    "포이즌 브레스",
    "익스플로젼",
    "포이즌 미스트",
  ],
  "아크메이지(썬,콜)": [
    "체인 라이트닝",
    "라이트닝 스피어",
    "썬더 스피어",
    "프로즌 오브",
    "블리자드",
    "아이스 스트라이크",
    "콜드 빔",
    "썬더 볼트",
    "칠링 스텝",
    "글레이셜 월",
    "엘퀴네스",
  ],
  에반: [
    "서클 오브 마나",
    "서클 오브 어스",
    "드래곤 브레스",
    "서클 오브 윈드",
    "서클 오브 썬더",
    "드래곤 마스터",
    "드래곤 스파킹",
    "드래곤 스위프트",
    "마법 잔해",
    "다크 포그",
    "서먼 오닉스 드래곤",
    "드래곤 다이브",
  ],
  엔젤릭버스터: [
    "프라이멀 로어",
    "트리니티",
    "소울 시커",
    "슈퍼 노바",
    "피니투라 페투치아",
    "소울 레조넌스",
    "핑크 스커드",
    "석세서",
    "버블 스타",
    "스팅 익스플로젼",
    "폴링 스타",
    "랜드 크래시",
  ],
  와일드헌터: [
    "서먼 재규어/어나더 바이트",
    "파이널 어택",
    "와일드 발칸",
    "클로우 컷",
    "소닉 붐/재규어 소울",
    "플래쉬 레인/램피지 애즈 원",
    "더블 샷/트리플 샷/와일드 샷",
    "크로스로드/화이트 히트 러쉬",
    "어시스턴트 헌팅 유닛",
    "드릴 컨테이너",
  ],
  윈드브레이커: [
    "천공의 노래",
    "트라이플링 윔/스톰 윔",
    "스톰 브링어",
    "페어리 턴",
    "몬순",
    "브리즈 애로우",
    "거스트 샷",
    "스파이럴 볼텍스",
    "핀포인트 피어스",
    "서리바람의 군무",
  ],
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
  일리움: [
    "크래프트:자벨린Ⅱ/글로리 윙:자벨린",
    "리액션:디스트럭션Ⅱ",
    "마키나/리액션:도미네이션Ⅱ",
    "크래프트:롱기누스",
    "커스 마크 완성",
    "데우스/리요",
    "글로리 윙:모탈 윙비트/크리스탈 스킬:모탈스윙",
    "롱기누스 존",
  ],
  제논: [
    "퍼지롭 매스커레이드",
    "홀로그램 그래피티",
    "핀포인트 로켓",
    "트라이앵글 포메이션",
    "멜트다운 익스플로젼",
    "다이아그널 체이스",
    "에너지 스플라인",
    "퀵실버 소드",
    "이온 쓰러스터",
    "트라이앵글 포메이션",
    "다이아그널 체이스",
    "필라 스크램블",
    "컴뱃 스위칭",
    "이지스 시스템",
    "블레이드 댄싱",
    "컨파인 인탱글",
    "멜트다운 익스플로젼",
  ],
  제로: [
    "피어스 쓰러스트/파워 스텀프",
    "스핀 커터/스로잉 웨폰",
    "롤링 커브/터닝 드라이브",
    "롤링 어썰터/휠 윈드",
    "스톰 브레이크/어스 브레이크",
    "문 스트라이크/쉐도우 스트라이크/어퍼 슬래시 어퍼 슬래시",
    "플래시 어썰터/프론트 슬래시",
    "윈드 커터/기가 크래시",
    "윈드 스트라이크/점핑 크래시",
    "쉐도우 레인",
  ],
  카데나: [
    "체인아츠:스트로크/웨폰 버라이어티/체인아츠:터프허슬",
    "서먼 슈팅 샷건/서먼 릴리싱 봄",
    "서먼 비팅 니들배트",
    "서먼 스트라이킹 브릭",
    "서먼 커팅 시미터/서먼 스크래칭 클로",
    "서먼 슬래싱 나이프/서먼 스로잉 윙대거",
    "체인아츠:테이크다운",
    "체인아츠:크러시/프로페셔널 에이전트",
  ],
  카이저: [
    "기가 슬래셔",
    "소드 스트라이크",
    "윌 오브 소드",
    "페트리파이드",
    "인퍼널 브레스",
    "윙비트",
    "드래곤슬래시",
    "플레임 샷",
    "임팩트 웨이브",
    "피어스 러쉬",
    "체인풀링",
    "블루 스트릭",
    "프로미넌스",
  ],
  카인: [
    "스트라이크 애로우/체이싱 샷",
    "드래곤 팡/리메인 인센스",
    "데스 블레싱/스니키 스나이핑",
    "체인 시클/포이즌 니들",
    "폴링 더스트",
    "스캐터링 샷",
    "샤프트 브레이크",
    "팬텀 블레이드/테어링 나이프",
  ],
  칼리: [
    "보이드 러쉬",
    "레조네이트/디시빙 블레이드",
    "헥스 : 차크람 스윕/스플릿/퓨리",
    "아츠 : 플러리/크레센텀",
    "보이드 블리츠",
    "데스 블로섬",
    "아츠 : 크로스 컷",
    "아츠 : 듀얼 엣지",
    "아츠 : 트리플 배쉬",
  ],
  캐논슈터: [
    "캐논 바주카",
    "캐논 버스터",
    "서포트 몽키 트윈스",
    "롤링 캐논 레인보우",
    "몽키 퓨리어스/미니 캐논볼",
    "마그네틱 앵커",
    "전함 노틸러스",
    "캐논 스플래셔",
    "펀칭 캐논",
    "기간틱 백스텝",
    "캐논 점프",
    "슬러그 샷",
    "몽키 러쉬붐",
    "캐논 스파이크",
    "오크통 룰렛",
  ],
  캡틴: [
    "퍼실레이드",
    "전함 노틸러스",
    "스트레인지 봄",
    "헤드 샷",
    "래피드 파이어",
    "캡틴 디그니티",
    "배틀쉽 봄버",
    "서먼 크루",
    "시즈 봄버",
    "매그넘 샷",
    "백스텝샷",
    "더블 배럴 샷",
    "불릿 스매시",
    "컨티뉴얼 에이밍",
    "스트레인지 봄",
  ],
  키네시스: [
    "싸이킥 그랩",
    "얼티메이트-메테리얼",
    "얼티메이트-B.P.M",
    "텔레키네시스",
    "얼티메이트-트레인",
    "싸이킥 드레인",
    "싸이킥 포스",
    "크래시",
    "매드 크래시",
    "얼티메이트-딥 임팩트",
    "싸이킥 그라운드2",
    "에버싸이킥",
    "싸이코 메트리",
  ],
  팔라딘: [
    "디바인 차지",
    "블래스트",
    "디바인 저지먼트/디바인 스티그마",
    "생츄어리",
    "파이널 어택",
    "스마이트",
    "페이지 오더",
    "디바인 스윙",
    "리프 어택/돌진/어퍼 차지",
  ],
  패스파인더: [
    "카디널 디스차지",
    "카디널 블래스트",
    "엣지 오브 레조넌스",
    "스플릿 미스텔",
    "카디널 트랜지션",
    "콤보 어썰트",
    "레이븐",
    "트리플 임팩트",
    "에인션트 아스트라",
  ],
  팬텀: [
    "얼티밋 드라이브",
    "블랑/느와르 카르트",
    "템페스트 오브 카드",
    "탤런트 오브 팬텀시프 III",
    "탤런트 오브 팬텀시프 IV",
    "로즈 카르트 피날레",
    "탤런트 오브 팬텀시프 II",
    "더블 피어싱",
    "탤런트 오브 팬텀시프 Ⅰ",
    "콜 오브 페이트",
    "브리즈 카르트",
    "코트 오브 암즈",
    "팬텀 차지",
    "탤런트 오브 팬텀시프 Ⅲ",
    "트와일라이트",
    "탤런트 오브 팬텀시프 Ⅳ",
  ],
  플레임위자드: [
    "오비탈 플레임",
    "블레이징 익스팅션",
    "피닉스 드라이브",
    "인페르노라이즈",
    "오비탈 익스플로젼",
    "카타클리즘",
    "플레임 바이트",
    "플레임 볼텍스",
    "플레임 템페스타",
    "마엘스트롬",
  ],
  호영: [
    "여의선 : 인/금고봉 : 인",
    "토파류/지진쇄",
    "추적 귀화부",
    "권술 : 호접지몽",
    "권술 : 흡성와류",
    "환영 분신부/선기 : 분신 둔갑 태을선인",
    "파초풍/멸화염",
    "마봉 호로부/둔갑 천근석",
    "권술 : 미생강변",
  ],
  히어로: [
    "레이징 블로우",
    "파이널 어택",
    "레이지 업라이징",
    "발할라",
    "인사이징",
    "오라 블레이드",
    "플래시 슬래시",
    "브랜디쉬",
    "브레이브 슬래시",
    "리프 어택/돌진/어퍼 차지",
  ],
};
