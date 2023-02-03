import CrystalCalculator from "../src/components/crystalCalculator/crystalCalculator";
import styled from "@emotion/styled/dist/emotion-styled.cjs";

export default function Home() {
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
