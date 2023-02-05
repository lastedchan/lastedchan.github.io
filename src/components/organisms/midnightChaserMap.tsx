import { SlotType } from "../../types/midnight_chaser";
import MidnightChaserItem from "../molcules/midnightChaserItem";
import styled from "@emotion/styled";
import { OrientationType } from "../../types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  slotList: SlotType;
  setSlotList: Dispatch<SetStateAction<SlotType>>;
  orientation: OrientationType;
};

export default function MidnightChaserMap({ slotList, setSlotList, orientation }: Props) {
  return (
    <Container orientation={orientation}>
      {slotList.map((item, i) => (
        <MidnightChaserItem key={i} idx={i} item={item} setSlotList={setSlotList} />
      ))}
    </Container>
  );
}

const Container = styled.div<{ orientation: OrientationType }>`
  flex: 0 1 ${_ => (_.orientation === "portrait" ? "100vw" : "calc(100vh - 53px)")};
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
`;
