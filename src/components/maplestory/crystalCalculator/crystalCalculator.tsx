import styled from "@emotion/styled";
import { useState } from "react";
import { range } from "lodash";
import { Character } from "./character";
import { Button } from "@mui/material";

export default function CrystalCalculator() {
  const [characterCount, setCharacterCount] = useState(0);

  return (
    <Container>
      <Button onClick={() => setCharacterCount(prev => prev + 1)}>
        캐릭터 추가
      </Button>
      {range(0, characterCount).map(idx => (
        <Character key={idx} idx={idx} />
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
