import styled from "@emotion/styled";
import VMatrixCalculator from "../../components/maplestory/vMatrixCalculator/vMatrixCalculator";

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
  gap: 4px;
  width: 100%;
`;
