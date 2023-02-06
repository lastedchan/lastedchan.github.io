import React, { useCallback, useEffect, useRef, useState } from "react";
import { inRange } from "lodash";
import { DropCoordinatesType } from "../../../types/midnight_chaser";
import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { slotListRecoil } from "../../../recoils/midnightChaser";

type Props = {
  item: string;
  i: number;
  visibility: "hidden" | "visible";
  dropCoordinates: DropCoordinatesType;
};

export default function DragItem({ item, i, visibility, dropCoordinates }: Props) {
  const setSlotList = useSetRecoilState(slotListRecoil);
  const [on, setOn] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const x = useRef(0);
  const y = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    x.current = e.clientX;
    y.current = e.clientY;
    setOn(true);
  }, []);
  const onTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    x.current = e.touches[0].clientX;
    y.current = e.touches[0].clientY;
    setOn(true);
  }, []);

  useEffect(() => {
    if (on) {
      const onmousemove = (e: MouseEvent) => {
        setTranslate({ x: e.clientX - x.current, y: e.clientY - y.current });
      };
      const ontouchmove = (e: TouchEvent) => {
        setTranslate({ x: e.touches[0].clientX - x.current, y: e.touches[0].clientY - y.current });
      };
      const onmouseup = (e: MouseEvent) => {
        setTranslate({ x: 0, y: 0 });
        const idx = dropCoordinates.findIndex(
          item => inRange(e.clientX, item.x, item.x + item.width) && inRange(e.clientY, item.y, item.y + item.height)
        );
        if (idx !== -1) setSlotList(prev => [...prev.slice(0, idx), i, ...prev.slice(idx + 1)]);
        setOn(false);
      };
      const ontouchend = (e: TouchEvent) => {
        setTranslate({ x: 0, y: 0 });
        const idx = dropCoordinates.findIndex(
          item =>
            inRange(e.changedTouches[0]?.clientX, item.x, item.x + item.width) &&
            inRange(e.changedTouches[0]?.clientY, item.y, item.y + item.height)
        );
        if (idx !== -1) setSlotList(prev => [...prev.slice(0, idx), i, ...prev.slice(idx + 1)]);
        setOn(false);
      };
      window.addEventListener("mousemove", onmousemove);
      window.addEventListener("touchmove", ontouchmove);
      window.addEventListener("mouseup", onmouseup);
      window.addEventListener("touchend", ontouchend);
      return () => {
        window.removeEventListener("mousemove", onmousemove);
        window.removeEventListener("touchmove", ontouchmove);
        window.removeEventListener("mouseup", onmouseup);
        window.removeEventListener("touchend", ontouchend);
      };
    }
  }, [dropCoordinates, i, on, setSlotList]);
  return (
    <Container
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        background: `url(${item}) no-repeat center`,
        visibility: visibility,
        transform: `translate(${translate.x}px, ${translate.y}px)`,
      }}
    />
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
