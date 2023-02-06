import styled from "@emotion/styled";
import { largeImgList } from "../../../constants/midnightChaser";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { dropElementsRecoil } from "../../../recoils";

type Props = {
  idx: number;
  item: number;
};

export default function MapItem({ idx, item }: Props) {
  const setDropElements = useSetRecoilState(dropElementsRecoil("mc"));

  useEffect(() => console.log(largeImgList[item]), [item]);

  return (
    <Item
      ref={ref => ref && setDropElements(prev => [...prev.slice(0, idx), ref as HTMLElement, ...prev.slice(idx + 1)])}
      style={{ backgroundImage: `url(${largeImgList[item]})` }}
    />
  );
}

const Item = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: calc(100% - 2px);
  border: 1px solid #aaa;
  background: no-repeat center;
  background-size: contain;
  &.on {
    background-color: rgba(200, 200, 200, 0.5);
  }
`;
