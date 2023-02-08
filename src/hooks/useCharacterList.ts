import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useMemo } from "react";
import * as gtag from "../libs/gtag";
import { characterListRecoil, isRebootRecoil } from "../recoils/crystalCalculator";
import { bossList, findMatch } from "../constants/crystalCalculator";

export default function useCharacterList() {
  const isReboot = useRecoilValue(isRebootRecoil);
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);

  const character = useCallback(
    (idx: number) => {
      const character_ = characterList[idx];

      const characterName = character_?.[0];

      const totalCount = character_?.[1]?.filter(_ => _.checked).length;
      const totalPrice =
        character_?.[1]
          ?.filter(_ => _.checked)
          .reduce((prev: number, _) => {
            const boss = bossList.find(__ => findMatch(_, __));
            return boss ? prev + Math.floor(boss.price / (_.headcount ?? 1)) : prev;
          }, 0) * (isReboot ? 5 : 1);

      const changeName = () => {
        const value = prompt(`캐릭터명을 입력해주세요.\n변경 전 : ${characterName}`);
        if (value) {
          gtag.event({
            action: "cc_change_name",
            label: characterName,
            value: value,
          });
          setCharacterList(prev => [...prev.slice(0, idx), [value, character_[1]], ...prev.slice(idx + 1)]);
        }
      };

      const copyCharacter = () => {
        if (confirm(`캐릭터를 복사하시겠습니까?\n복사할 캐릭터 : ${characterName}`)) {
          gtag.event({
            action: "cc_copy_character",
            value: characterName,
          });
          setCharacterList(prev => [...prev, character_]);
        }
      };

      const removeCharacter = () => {
        if (confirm(`정말로 삭제하시겠습니까?\n삭제될 캐릭터 : ${characterName}`)) {
          gtag.event({
            action: "cc_remove_character",
            value: characterName,
          });
          setCharacterList(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
        }
      };

      return {
        character: character_,
        characterName,
        totalPrice,
        totalCount,
        changeName,
        copyCharacter,
        removeCharacter,
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
  const totalHuntedBosses = useMemo(
    () =>
      characterList.reduce<string[]>((prev, character) => [...prev, ...character[1].map(item => item.difficulty + " " + item.name)], []),
    [characterList]
  );

  return { characterList, character, addCharacter, totalPrice, totalCount, totalHuntedBosses };
}
