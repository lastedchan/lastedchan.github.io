import styled from "@emotion/styled";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { inRange } from "lodash";

type Props = {
  idx: number;
  value: number;
  onChange: (idx: number, value: number) => void;
};
export default function NumberField({ idx, value, onChange }: Props) {
  const change = (n: 1 | -1) =>
    inRange(Number(value) + n, 1, 7) && onChange(idx, Number(value) + n);

  return (
    <Container variant={"contained"}>
      <Button onClick={() => change(-1)}>-</Button>
      <Typography sx={{ textAlign: "center" }}>{value} 인격</Typography>
      <Button onClick={() => change(1)} color={"error"}>
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
  & button {
    flex: 2;
  }
  & p {
    flex: 0 0 50px;
  }
`;
