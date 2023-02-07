//#region crystalCalculator
export type BossType = {
  type: "일일" | "주간" | "월간";
  difficulty: "이지" | "노멀" | "하드" | "카오스" | "익스트림";
  name: string;
  price: number;
};
export type BossListType = BossType[];
export type HuntedBossType = {
  difficulty: "이지" | "노멀" | "하드" | "카오스" | "익스트림";
  name: string;
  checked?: boolean;
  headcount?: number;
};
export type CharacterType = [string, HuntedBossType[]];
export type CharacterListType = CharacterType[];
