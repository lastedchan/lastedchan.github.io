import styled from "@emotion/styled";
import VMatrixCalculator from "../../src/components/maplestory/vMatrixCalculator/vMatrixCalculator";

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
