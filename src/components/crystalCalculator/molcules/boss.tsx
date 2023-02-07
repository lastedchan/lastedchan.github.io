import { Box, Paper, Switch, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import * as gtag from "../../../libs/gtag";
import { BossType } from "../../../types/crystalCalculator";
import { characterListRecoil, characterSelector, isRebootRecoil } from "../../../recoils/crystalCalculator";
import { bossList, findMatch } from "../../../constants/crystalCalculator";
import NumberField from "../../common/atoms/numberField";
import BossName from "../atoms/bossName";
import { changeValue } from "../../../libs/helpers";

type Props = {
  i: number;
  idx: number;
  item: BossType;
};
export default function Boss({ i, idx, item }: Props) {
  const isReboot = useRecoilValue(isRebootRecoil);
  const character = useRecoilValue(characterSelector(idx));
  const setCharacterList = useSetRecoilState(characterListRecoil);

  const modifyHuntedBoss = useCallback(
    (i: number, v: { headcount?: number; checked?: boolean }) => {
      let same = false;

      //
      const idx2 = character[1].findIndex(_ => findMatch(_, bossList[i]));
      // 이미 선택된 중복 보스
      const idx3 = character[1].findIndex(_ => _.name === bossList[i].name && _.checked);

      if (v.checked && idx3 !== -1 && idx3 !== idx2) {
        const prev = `${character[1][idx3].difficulty} ${character[1][idx3].name}`;
        const curr = `${bossList[i].difficulty} ${bossList[i].name}`;
        if (confirm(`이미 ${prev}이(가) 선택되어있습니다.\n${curr}(으)로 변경하시겠습니까?`)) {
          same = true;
        }
        gtag.event({ action: "cc_replace_same_boss", label: bossList[i].name, value: same });
        if (!same) return;
      }

      setCharacterList(prev => {
        let arr = [...prev];
        if (same) {
          arr = changeValue(arr, idx, [arr[idx][0], changeValue(arr[idx][1], idx3, { ...arr[idx][1][idx3], checked: false })]);
        }
        arr = changeValue(arr, idx, [
          arr[idx][0],
          changeValue(arr[idx][1], idx2, { ...{ difficulty: bossList[i].difficulty, name: bossList[i].name }, ...arr[idx][1][idx2], ...v }),
        ]);
        console.log(arr);
        return arr;
      });
    },
    [character, idx, setCharacterList]
  );

  return (
    <Item>
      <ItemHead>
        <BossName item={item} />
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
        min={1}
        max={6}
        suffix={" 인"}
        value={character[1].find(_ => findMatch(_, item))?.headcount ?? 1}
        onChange={value => modifyHuntedBoss(i, { headcount: value })}
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
