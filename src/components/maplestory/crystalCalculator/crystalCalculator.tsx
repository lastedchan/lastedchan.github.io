import styled from "@emotion/styled";
import { Character } from "./character";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { characterListRecoil } from "../../../constants/recoil";

export default function CrystalCalculator() {
  const [characterList, setCharacterList] = useRecoilState(characterListRecoil);

  const addCharacter = () =>
    setCharacterList(prev => ({ ...prev, [+new Date()]: [] }));

  console.log(characterList);

  return (
    <Container>
      <Button onClick={addCharacter}>캐릭터 추가</Button>
      {Object.keys(characterList).map((idx, i) => (
        <Character key={idx} idx={idx} number={i} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
