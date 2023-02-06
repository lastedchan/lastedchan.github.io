import styled from "@emotion/styled";
import React from "react";
import Map from "../molcules/map";
import DragBox from "../molcules/dragBox";
import useOrientation from "../../../hooks/useOrientation";
import { OrientationType } from "../../../types";

export default function MidnightChaser() {
  const orientation = useOrientation();

  return (
    <Container orientation={orientation}>
      <Map />
      <DragBox />
    </Container>
  );
}

const Container = styled.div<{ orientation: OrientationType }>`
  display: flex;
  flex-direction: ${_ => (_.orientation === "portrait" ? "column" : "row")};
  justify-content: space-between;
  padding: 8px;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
`;
