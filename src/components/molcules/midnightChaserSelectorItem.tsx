import Image from "next/image";
import { Box } from "@mui/material";

type Props = {
  item: string;
  i: number;
  visibility: "hidden" | "visible";
};

export default function MidnightChaserSelectorItem({ item, i, visibility }: Props) {
  const onDragStart = (e: any) => e.dataTransfer.setData("data", String(i));

  return (
    <Box key={i} width={38} height={38} visibility={visibility} onDragStart={onDragStart}>
      <Image src={item} alt={""} width={38} height={38} />
    </Box>
  );
}
