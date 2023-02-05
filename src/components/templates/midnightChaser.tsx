import styled from "@emotion/styled";
import React, { useState } from "react";
import { SlotType } from "../../types/midnight_chaser";
import MidnightChaserMap from "../organisms/midnightChaserMap";
import MidnightChaserSelector from "../organisms/midnightChaserSelector";
import useOrientation from "../../hooks/useOrientation";
import AdWrapper from "../molcules/adWrapper";

export default function MidnightChaser() {
  const [slotList, setSlotList] = useState<SlotType>([-1, -1, -1, -1, -1, -1, -1, -1, -1]);

  const orientation = useOrientation();

  return (
    <Container isPortrait={orientation === "portrait"}>
      <AdWrapper />
      <MidnightChaserMap slotList={slotList} setSlotList={setSlotList} orientation={orientation} />
      <MidnightChaserSelector slotList={slotList} setSlotList={setSlotList} />
    </Container>
  );
}

const Container = styled.div<{ isPortrait: boolean }>`
  display: flex;
  flex-direction: ${_ => (_.isPortrait ? "column" : "row")};
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
