import NumberField from "./numberField";
import styled from "@emotion/styled";
import { Box, FormControlLabel, FormGroup } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { jobRecoil, stackListRecoil } from "../../../constants/recoil";

export default function StackList() {
  const job = useRecoilValue(jobRecoil);
  const [stackList, setCoreStackList] = useRecoilState(stackListRecoil(job));
  const onCoreChange = (idx: string, value: number) => {
    if (isNaN(value)) return false;
    setCoreStackList(prev => ({ ...prev, [idx]: value }));
  };

  return (
    <Container>
      <List>
        {Object.entries(stackList).map(([i, value]) => (
          <Item
            key={i}
            control={
              <NumberField idx={i} value={value} onChange={onCoreChange} />
            }
            label={i}
          />
        ))}
      </List>
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

const List = styled(FormGroup)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  transition: height 0.4s;
`;

const Item = styled(FormControlLabel)`
  flex-direction: column;
  margin: 0;
  width: 100%;
  overflow: hidden;

  & > span {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & input {
    text-align: center;
  }
`;
