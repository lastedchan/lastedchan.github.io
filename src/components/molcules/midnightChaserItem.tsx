import styled from "@emotion/styled";
import { largeImgList } from "../../constants/midnightChaser";
import { Dispatch, SetStateAction } from "react";
import { SlotType } from "../../types/midnight_chaser";

type Props = {
  idx: number;
  item: number;
  setSlotList: Dispatch<SetStateAction<SlotType>>;
};

export default function MidnightChaserItem({ idx, item, setSlotList }: Props) {
  const onDragStart = (e: any, i: number) => e.dataTransfer.setData("data", String(i));
  const onDragOver = (e: any) => {
    e.preventDefault();
    e.currentTarget.classList.add("on");
  };
  const onDragLeave = (e: any) => {
    e.preventDefault();
    e.currentTarget.classList.remove("on");
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    onDragLeave(e);
    const data = Number(e.dataTransfer.getData("data"));
    if (!isNaN(data)) setSlotList(prev => [...prev.slice(0, idx), data, ...prev.slice(idx + 1)]);
  };
  const onClick = () => setSlotList(prev => [...prev.slice(0, idx), -1, ...prev.slice(idx + 1)]);

  return (
    <Item
      src={largeImgList[item]}
      onDragStart={e => onDragStart(e, item)}
      onDragEnd={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
