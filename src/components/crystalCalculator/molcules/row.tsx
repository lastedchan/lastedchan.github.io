import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  children?: ReactNode[];
  [p: string]: any;
};

export default function Row({ stickyHeader, stickyFooter, children, ...props }: Props) {
  const Container = styled(Box)`
    position: ${stickyHeader || stickyFooter ? "sticky" : ""};
    ${stickyHeader ? "top: 0;" : stickyFooter ? "bottom: 0;" : ""}
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 53px 1fr 1fr 150px;
    padding: 0 8px;
    justify-content: center;
    align-items: center;
  `;

  return <Container {...props}>{children}</Container>;
}
