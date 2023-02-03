import { Button, ButtonGroup, Typography } from "@mui/material";
import styled from "@emotion/styled/dist/emotion-styled.cjs";
import { Dispatch, SetStateAction } from "react";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  prefix?: string;
  suffix?: string;
};

export default function NumberField({ min, max, step = 1, value, setValue, prefix, suffix }: Props) {
  const minus = () => setValue(prev => (prev > min ? Math.max(prev - step, min) : prev));
  const plus = () => setValue(prev => (prev < max ? Math.min(prev + step, max) : prev));

  return (
    <Container variant={"contained"}>
      <Button onClick={minus} sx={{ flex: 2 }}>
        -
      </Button>
      <Typography flex={"0 0 50px"} textAlign={"center"}>
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
