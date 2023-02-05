import styled from "@emotion/styled";
import { largeImgList } from "../../constants/midnightChaser";
import { Dispatch, SetStateAction } from "react";
import { SlotType } from "../../types/midnight_chaser";
import { useSetRecoilState } from "recoil";
import { dropElementsRecoil } from "../../recoils";

type Props = {
  idx: number;
  item: number;
  setSlotList: Dispatch<SetStateAction<SlotType>>;
};

export default function MidnightChaserItem({ idx, item, setSlotList }: Props) {
  const setDropElements = useSetRecoilState(dropElementsRecoil("mc"));

  const onClick = () => setSlotList(prev => [...prev.slice(0, idx), -1, ...prev.slice(idx + 1)]);

  return (
    <Item
      ref={ref => ref && setDropElements(prev => [...prev.slice(0, idx), ref, ...prev.slice(idx + 1)])}
      src={largeImgList[item]}
      onClick={onClick}
    />
  );
}

const Item = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  border: 1px solid #aaa;
  background: url(${_ => _.src}) no-repeat center;
  background-size: contain;
  &.on {
    background-color: rgba(200, 200, 200, 0.5);
  }
`;
