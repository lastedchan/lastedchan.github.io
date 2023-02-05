import styled from "@emotion/styled";
import React, { useState } from "react";
import { SlotType } from "../../types/midnight_chaser";
import MidnightChaserMap from "../organisms/midnightChaserMap";
import MidnightChaserSelector from "../organisms/midnightChaserSelector";
import useOrientation from "../../hooks/useOrientation";
import AdWrapper from "../adWrapper";

export default function MidnightChaser() {
  const [slotList, setSlotList] = useState<SlotType>([-1, -1, -1, -1, -1, -1, -1, -1, -1]);

  const orientation = useOrientation();

  return (
    <Container isPortrait={orientation === "portrait"}>
      <AdWrapper>
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-8583770780355894"
          data-ad-slot="4169298389"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </AdWrapper>
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
