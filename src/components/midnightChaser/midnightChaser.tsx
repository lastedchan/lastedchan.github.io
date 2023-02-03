import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Image from "next/image";
import Popup from "./popup";
import { SlotType } from "../../types/midnight_chaser";

export default function MidnightChaser() {
  const [slotList, setSlotList] = useState<SlotType>([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);
  const [popupOn, setPopupOn] = useState(false);
  const [currSlot, setCurrSlot] = useState(-1);

  useEffect(() => setCurrSlot(-1), [slotList]);
  useEffect(() => setPopupOn(currSlot !== -1), [currSlot]);

  const openPopup = useCallback((item: number) => setCurrSlot(item), []);

  const selectItem = useCallback(
    (item: number) =>
      setSlotList(prev => [
        ...prev.slice(0, currSlot),
        item,
        ...prev.slice(currSlot + 1),
      ]),
    [currSlot]
  );

  return (
    <Container>
      <SlotContainer>
        {slotList.map((item, i) => (
          <Wrapper key={i} onClick={() => openPopup(i)}>
            {item !== -1 ? (
              <Image
                src={largeImgList[item]}
                alt={""}
                width={450}
                height={450}
              />
            ) : (
              <Typography>-</Typography>
            )}
          </Wrapper>
        ))}
      </SlotContainer>
      <Popup opened={popupOn} usedItem={slotList} selectItem={selectItem} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SlotContainer = styled.div`
  display: grid;
  grid-template: repeat(3, calc(100% / 3)) / repeat(3, calc(100% / 3));
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  justify-content: center;
  align-items: center;
`;

const largeImgList = [
  "/midnight_chaser/l1.png",
  "/midnight_chaser/l2.png",
  "/midnight_chaser/l3.png",
  "/midnight_chaser/l4.png",
  "/midnight_chaser/l5.png",
  "/midnight_chaser/l6.png",
  "/midnight_chaser/l7.png",
  "/midnight_chaser/l8.png",
  "/midnight_chaser/l9.png",
];
