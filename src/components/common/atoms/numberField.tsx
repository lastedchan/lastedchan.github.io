import { Button, ButtonGroup, Typography } from "@mui/material";
import styled from "@emotion/styled";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
};

export default function NumberField({ min, max, step = 1, value, onChange, prefix, suffix }: Props) {
  const minus = () => onChange(value > min ? Math.max(value - step, min) : value);
  const plus = () => onChange(value < max ? Math.min(value + step, max) : value);

  return (
    <Container variant={"contained"}>
      <Button onClick={minus} sx={{ flex: 2 }}>
        -
      </Button>
      <Typography flex={"0 0 auto"} p={"0 8px"} textAlign={"center"}>
        {prefix}
        {value}
        {suffix}
      </Typography>
      <Button onClick={plus} sx={{ flex: 2 }} color={"error"}>
        +
      </Button>
    </Container>
  );
}

const Container = styled(ButtonGroup)`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 100%;
  align-items: center;
`;
