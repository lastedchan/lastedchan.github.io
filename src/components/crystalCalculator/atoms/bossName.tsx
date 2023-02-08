import { BossType } from "../../../types/crystalCalculator";
import { colorPrefers } from "../../../constants/crystalCalculator";
import { Typography } from "@mui/material";

type Props = {
  item: BossType;
};

export default function BossName({ item }: Props) {
  return (
    <Typography
      p={0.5}
      textAlign={"center"}
      bgcolor={colorPrefers.find(_ => _.str === item.difficulty)?.bgcolor}
      color={colorPrefers.find(_ => _.str === item.difficulty)?.color}
    >
      {item.difficulty} {item.name}
    </Typography>
  );
}
