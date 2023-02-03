import styled from "@emotion/styled";
import CrystalCalculator from "../../src/components/maplestory/crystalCalculator/crystalCalculator";
import { useRouter } from "next/router";

export default function CrystalCalculatorIndex() {
  const router = useRouter();

  router.replace("/");

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
