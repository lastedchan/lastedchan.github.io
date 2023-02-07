import { BossType } from "../../../types/crystalCalculator";
import { colors } from "../../../constants/crystalCalculator";
import { Typography } from "@mui/material";

type Props = {
  item: BossType;
};

export default function BossName({ item }: Props) {
  return (
    <Typography
      p={0.5}
      textAlign={"center"}
      bgcolor={colors.find(_ => _.str === item.difficulty)?.bgcolor}
      color={colors.find(_ => _.str === item.difficulty)?.color}
    >
      {item.difficulty} {item.name}
    </Typography>
  );
}
