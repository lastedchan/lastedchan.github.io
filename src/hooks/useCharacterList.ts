import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useMemo } from "react";
import * as gtag from "../libs/gtag";
import { characterListRecoil, isRebootRecoil } from "../recoils/crystalCalculator";
import { getTotalCount, getTotalPrice } from "../constants/crystalCalculator";

export default function useCharacterList() {
  const isReboot = useRecoilValue(isRebootRecoil);
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);

  const character = (idx: number) => {
    const character_ = characterList[idx];

    const characterName = character_?.[0];
    const totalPrice = getTotalPrice(character_?.[1], isReboot);
    const totalCount = getTotalCount(character_?.[1]);

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
  };

  const totalPrice = useMemo(
    () => characterList.reduce((prev, character) => prev + getTotalPrice(character[1], isReboot), 0),
    [characterList, isReboot]
  );
  const totalCount = useMemo(() => characterList.reduce((prev, character) => prev + getTotalCount(character[1]), 0), [characterList]);

  const addCharacter = useCallback(() => {
    gtag.event({
      action: "cc_add_character",
      value: String(characterList.length + 1),
    });
    setCharacterList(prev => [...prev, [`캐릭터 ${characterList.length + 1}`, []]]);
  }, [characterList.length, setCharacterList]);

  return { totalPrice, totalCount, character, addCharacter };
}
