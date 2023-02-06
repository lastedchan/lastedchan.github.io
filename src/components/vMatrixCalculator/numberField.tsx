import styled from "@emotion/styled";
import { Button, ButtonGroup, Typography } from "@mui/material";

type Props = {
  idx: string;
  value: number;
  onChange: (idx: string, value: number) => void;
};
export default function NumberField({ idx, value, onChange }: Props) {
  const change = (n: 1 | -1) => Number(value) + n >= 0 && onChange(idx, Number(value) + n);

  return (
    <Container variant={"contained"}>
      <Button onClick={() => change(-1)}>-</Button>
      <Typography sx={{ textAlign: "center" }}>{value}</Typography>
      <Button onClick={() => change(1)} color={"error"}>
        +
      </Button>
    </Container>
  );
}

const Container = styled(ButtonGroup)`
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
