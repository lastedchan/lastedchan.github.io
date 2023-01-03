import styled from "@emotion/styled";
import { Box } from "@mui/material";
import MidnightChaser from "../../src/components/maplestory/midnightChaser";

export default function MidnightChaserIndex() {
  return (
    <Container>
      <Wrapper>
        <MidnightChaser />
      </Wrapper>
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vw;
  max-width: calc(100vh - 72px);
  max-height: calc(100vh - 72px);
`;
