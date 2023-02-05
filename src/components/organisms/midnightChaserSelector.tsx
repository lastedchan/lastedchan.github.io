import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { smallImgList } from "../../constants/midnightChaser";
import { SlotType } from "../../types/midnight_chaser";
import MidnightChaserSelectorItem from "../molcules/midnightChaserSelectorItem";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { dropElementsRecoil } from "../../recoils";
import { inRange } from "lodash";

type Props = {
  slotList: SlotType;
  setSlotList: Dispatch<SetStateAction<SlotType>>;
};

export default function MidnightChaserSelector({ slotList, setSlotList }: Props) {
  const dropElements = useRecoilValue(dropElementsRecoil("mc"));
  const [dropCoordinates, setDropCoordinates] = useState<any[]>([]);

  const currItem = useRef<HTMLElement>();
  const x = useRef<number>(0);
  const y = useRef<number>(0);

  useEffect(() => {
    const func = () =>
      setDropCoordinates(
        dropElements.map(item => ({ x: item.offsetLeft, y: item.offsetTop, width: item.offsetWidth, height: item.offsetHeight }))
      );
    window.addEventListener("resize", func);
    func();
    return () => window.removeEventListener("resize", func);
  }, [dropElements]);

  useEffect(() => {
    window.onmouseup = e => {
      if (currItem.current) {
        currItem.current.style.transform = "";
        const idx = dropCoordinates.findIndex(
          item => inRange(e.pageX, item.x, item.x + item.width) && inRange(e.pageY, item.y, item.y + item.height)
        );
        if (idx !== -1)
          setSlotList(prev => [...prev.slice(0, idx), Number(currItem.current?.getAttribute("data-idx")) ?? -1, ...prev.slice(idx + 1)]);
      }
      currItem.current = undefined;
    };
    window.ontouchend = e => {
      if (currItem.current) {
        currItem.current.style.transform = "";
        const idx = dropCoordinates.findIndex(
          item =>
            inRange(e.changedTouches[0]?.pageX, item.x, item.x + item.width) &&
            inRange(e.changedTouches[0]?.pageY, item.y, item.y + item.height)
        );
        console.log(idx);
        if (idx !== -1)
          setSlotList(prev => [...prev.slice(0, idx), Number(currItem.current?.getAttribute("data-idx")) ?? -1, ...prev.slice(idx + 1)]);
      }
      currItem.current = undefined;
    };
    window.onmousemove = e => {
      if (currItem.current) {
        currItem.current.style.transform = `translate(${e.x - x.current}px, ${e.y - y.current}px)`;
      }
    };
    window.ontouchmove = e => {
      if (currItem.current) {
        currItem.current.style.transform = `translate(${e.touches[0].clientX - x.current}px, ${e.touches[0].clientY - y.current}px)`;
      }
    };
    return () => {
      window.onmousemove = window.ontouchmove = window.onmouseup = window.ontouchend = null;
    };
  }, [dropCoordinates, dropElements, setSlotList, x, y]);

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    x.current = e.pageX;
    y.current = e.pageY;
    currItem.current = e.currentTarget;
  };
  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    x.current = e.touches[0].pageX;
    y.current = e.touches[0].pageY;
    currItem.current = e.currentTarget;
  };

  return (
    <Container>
      <PopupContainer>
        {smallImgList.map((item, i) => (
          <MidnightChaserSelectorItem
            key={i}
            item={item}
            i={i}
            visibility={slotList?.findIndex(_ => _ === i) !== -1 ? "hidden" : "visible"}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          />
        ))}
      </PopupContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1 0;
  display: flex;
  padding: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled(Card)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: visible;
`;
