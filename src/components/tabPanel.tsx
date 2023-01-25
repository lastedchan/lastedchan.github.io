import React from "react";
import { Box, SxProps } from "@mui/material";
import styled from "@emotion/styled";

type Props = {
  idx: number;
  value: number;
  children?: React.ReactNode;
  sx?: SxProps;
};
export default function TabPanel({ idx, value, children, sx }: Props) {
  return (
    <Container role={"tab-panel"} hidden={idx !== value}>
      <Wrapper sx={sx}>{children}</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  height: 100%;
  overflow: hidden;
`;
