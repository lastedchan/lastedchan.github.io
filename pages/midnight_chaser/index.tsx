import styled from "@emotion/styled";
import { Box } from "@mui/material";
import MidnightChaser from "../../src/components/midnightChaser/templates/midnightChaser";

export default function MidnightChaserIndex() {
  return (
    <Container>
      <MidnightChaser />
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
