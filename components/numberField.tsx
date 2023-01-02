import styled from "@emotion/styled";
import { Button, ButtonGroup, TextField } from "@mui/material";

type Props = {
  idx: string;
  value: number;
  onChange: (idx: string, value: number) => void;
};
export default function NumberField({ idx, value, onChange }: Props) {
  const change = (n: 1 | -1) =>
    Number(value) + n >= 0 && onChange(idx, Number(value) + n);

  return (
    <Container variant={"contained"} size={"small"}>
      <Button size={"small"} onClick={() => change(-1)}>
        -
      </Button>
      <TextField
        variant={"standard"}
        value={value}
        sx={{ textAlign: "center" }}
        size={"small"}
        onChange={e => onChange(idx, Number(e.target.value))}
      />
      <Button size={"small"} onClick={() => change(1)} color={"error"}>
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
  & * {
    flex: 1;
  }
`;
