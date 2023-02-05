import Image from "next/image";
import { Box } from "@mui/material";
import { MouseEventHandler } from "react";

type Props = {
  item: string;
  i: number;
  visibility: "hidden" | "visible";
  onMouseDown: MouseEventHandler<HTMLElement>;
  onTouchStart: (e: any) => void;
};

export default function MidnightChaserSelectorItem({ item, i, visibility, onMouseDown, onTouchStart }: Props) {
  return (
    <Box key={i} width={38} height={38} visibility={visibility} onMouseDown={onMouseDown} onTouchStart={onTouchStart} data-idx={i}>
      <Image src={item} alt={""} width={38} height={38} />
    </Box>
  );
}
