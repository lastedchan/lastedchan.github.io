import styled from "@emotion/styled";
import { smallImgList } from "../../../constants/midnightChaser";
import { DropCoordinatesType } from "../../../types/midnight_chaser";
import DragItem from "../atoms/dragItem";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { dropElementsRecoil } from "../../../recoils";
import { debounce } from "lodash";
import { OrientationType } from "../../../types";
import { slotListRecoil } from "../../../recoils/midnightChaser";
import useOrientation from "../../../hooks/useOrientation";

export default function DragBox() {
  const slotList = useRecoilValue(slotListRecoil);
  const dropElements = useRecoilValue(dropElementsRecoil("mc"));
  const [dropCoordinates, setDropCoordinates] = useState<DropCoordinatesType>([]);
  const orientation = useOrientation();

  useEffect(() => {
    const onresize = debounce(
      () =>
        setDropCoordinates(
          dropElements.map(item => ({ x: item.offsetLeft, y: item.offsetTop, width: item.offsetWidth, height: item.offsetHeight }))
        ),
      500
    );
    window.addEventListener("resize", onresize);
    onresize();
    return () => window.removeEventListener("resize", onresize);
  }, [dropElements]);

  return (
    <Container orientation={orientation}>
      {smallImgList.map((item, i) => (
        <DragItem
          key={i}
          item={item}
          i={i}
          visibility={slotList?.findIndex(_ => _ === i) !== -1 ? "hidden" : "visible"}
          dropCoordinates={dropCoordinates}
        />
      ))}
    </Container>
  );
}

const Container = styled.div<{ orientation: OrientationType }>`
  flex: 1 0;
  display: grid;
  grid-template: repeat(3, minmax(38px, 1fr)) / repeat(3, minmax(38px, 1fr));
  gap: 8px;
  padding: 8px;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-content: space-around;
  overflow: visible;
`;
