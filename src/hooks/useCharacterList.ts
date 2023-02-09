import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useMemo } from "react";
import * as gtag from "../libs/gtag";
import { characterListRecoil, isRebootRecoil } from "../recoils/crystalCalculator";
import { bossList, findMatch } from "../constants/crystalCalculator";
import { changeValue } from "../libs/helpers";

export default function useCharacterList() {
  const isReboot = useRecoilValue(isRebootRecoil);
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);

  const character = useCallback(
    (idx: number) => {
      const character_ = characterList[idx];

      const characterName = character_?.[0];

      const changeName = () => {
        const value = prompt(`캐릭터명을 입력해주세요.\n변경 전 : ${characterName}`);
        if (value) {
          gtag.event({
            action: "cc_change_name",
            value: value,
          });
          setCharacterList(prev => changeValue(prev, idx, [value, prev[idx][1]]));
        }
      };

      const copyCharacter = () => {
        if (confirm(`캐릭터를 복사하시겠습니까?\n복사할 캐릭터 : ${characterName}`)) {
          gtag.event({
            action: "cc_copy_character",
          });
          setCharacterList(prev => [...prev, character_]);
        }
      };

      const removeCharacter = () => {
        if (confirm(`정말로 삭제하시겠습니까?\n삭제될 캐릭터 : ${characterName}`)) {
          gtag.event({
            action: "cc_remove_character",
          });
          setCharacterList(prev => changeValue(prev, idx));
        }
      };

      const setBossHunted = (v: boolean, i?: number) => {
        typeof i === "number"
          ? setCharacterList(prev =>
              changeValue(prev, idx, [prev[idx][0], changeValue(prev[idx][1], i, { ...prev[idx][1][i], hunted: v })])
            )
          : setCharacterList(prev => changeValue(prev, idx, [prev[idx][0], prev[idx][1].map(item => ({ ...item, hunted: v }))]));
      };

      const totalCount = character_?.[1]?.filter(_ => _.checked).length;
      const totalPrice = character_?.[1]
        ?.filter(_ => _.checked)
        .reduce((prev: number, _) => {
          const boss = bossList.find(__ => findMatch(_, __));
          return boss ? prev + Math.floor((boss.price * (isReboot ? 5 : 1)) / (_.headcount ?? 1)) : prev;
        }, 0);

      return {
        character: character_,
        characterName,
        changeName,
        copyCharacter,
        removeCharacter,
        setBossHunted,
        totalPrice,
        totalCount,
      };
    },
    [characterList, isReboot, setCharacterList]
  );

  const addCharacter = useCallback(() => {
    gtag.event({
      action: "cc_add_character",
      value: String(characterList.length + 1),
    });
    setCharacterList(prev => [...prev, [`캐릭터 ${characterList.length + 1}`, []]]);
  }, [characterList.length, setCharacterList]);

  const totalCount = useMemo(() => characterList.reduce((prev, _, i) => prev + character(i).totalCount, 0), [character, characterList]);
  const totalPrice = useMemo(() => characterList.reduce((prev, _, i) => prev + character(i).totalPrice, 0), [character, characterList]);

  return { characterList, character, addCharacter, totalPrice, totalCount };
}
