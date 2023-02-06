import { Box, Paper, Switch, Typography } from "@mui/material";
import NumberField from "./numberField";
import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import * as gtag from "../../libs/gtag";
import { bossType } from "../../types/crystal_calculator";
import { characterListRecoil, characterSelector, isRebootRecoil } from "../../recoils/crystal_calculator";
import { bossList, colors, findMatch } from "../../constants/crystalCalculator";

type Props = {
  i: number;
  idx: number;
  item: bossType;
};
export default function Boss({ i, idx, item }: Props) {
  const isReboot = useRecoilValue(isRebootRecoil);
  const character = useRecoilValue(characterSelector(idx));
  const setCharacterList = useSetRecoilState(characterListRecoil);

  const modifyHuntedBoss = useCallback(
    (i: number, v: { headcount?: number; checked?: boolean }) => {
      let same = false;

      const idx2 = character[1].findIndex(_ => findMatch(_, bossList[i]));

      const idx3 = character[1].findIndex(_ => _.name === bossList[i].name && _.checked);
      if (v.checked && idx3 !== -1 && idx3 !== idx2) {
        const prev = `${character[1][idx3].difficulty} ${character[1][idx3].name}`;
        const curr = `${bossList[i].difficulty} ${bossList[i].name}`;
        if (confirm(`이미 ${prev}이(가) 선택되어있습니다.\n${curr}(으)로 변경하시겠습니까?`)) {
          gtag.event({
            action: "cc_replace_same_boss",
            value: JSON.stringify({ prev: prev, curr: curr }),
          });
          same = true;
        } else {
          return;
        }
      }

      setCharacterList(prev => [
        ...prev.slice(0, idx),
        [
          prev[idx][0],
          idx2 >= 0
            ? [
                ...(same && idx2 > idx3
                  ? [...prev[idx][1].slice(0, idx3), { ...prev[idx][1][idx3], checked: false }, ...prev[idx][1].slice(idx3 + 1, idx2)]
                  : prev[idx][1].slice(0, idx2)),
                { ...prev[idx][1][idx2], ...v },
                ...(same && idx3 > idx2
                  ? [...prev[idx][1].slice(idx2 + 1, idx3), { ...prev[idx][1][idx3], checked: false }, ...prev[idx][1].slice(idx3 + 1)]
                  : prev[idx][1].slice(idx2 + 1)),
              ]
            : [
                ...(same
                  ? [...prev[idx][1].slice(0, idx3), { ...prev[idx][1][idx3], checked: false }, ...prev[idx][1].slice(idx3 + 1)]
                  : prev[idx][1]),
                {
                  difficulty: bossList[i].difficulty,
                  name: bossList[i].name,
                  ...v,
                },
              ],
        ],
        ...prev.slice(idx + 1),
      ]);
    },
    [character, idx, setCharacterList]
  );

  return (
    <Item>
      <ItemHead>
        <Typography
          p={0.5}
          textAlign={"center"}
          bgcolor={colors.find(_ => _.str === item.difficulty)?.bgcolor}
          color={colors.find(_ => _.str === item.difficulty)?.color}
        >
          {item.difficulty} {item.name}
        </Typography>
        <Switch
          checked={character[1].find(_ => findMatch(_, item))?.checked ?? false}
          onChange={(e, v) => modifyHuntedBoss(i, { checked: v })}
        />
      </ItemHead>
      <Typography fontWeight={"bold"}>판매 금액</Typography>
      <Typography>
        {Math.floor((item.price * (isReboot ? 5 : 1)) / (character[1].find(_ => findMatch(_, item))?.headcount ?? 1)).toLocaleString()} 메소
      </Typography>
      <NumberField
        idx={i}
        value={character[1].find(_ => findMatch(_, item))?.headcount ?? 1}
        onChange={(idx, value) => modifyHuntedBoss(idx, { headcount: value })}
      />
    </Item>
  );
}

const Item = styled(Paper)`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  width: 100%;
`;

const ItemHead = styled(Box)`
  display: grid;
  grid-column: 1 / -1;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  opacity: 0.9;
`;
