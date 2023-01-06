import NumberField from "./numberField";
import styled from "@emotion/styled";
import { Box, FormControlLabel, FormGroup } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { jobRecoil, stackListRecoil } from "../../../constants/recoil";

export default function CoreStackList() {
  const job = useRecoilValue(jobRecoil);
  const [coreStackList, setCoreStackList] = useRecoilState(
    stackListRecoil(job)
  );
  const onCoreChange = (idx: string, value: number) => {
    if (isNaN(value)) return false;
    setCoreStackList(prev => ({ ...prev, [idx]: value }));
  };

  return (
    <Container>
      <List>
        {Object.entries(coreStackList).map(([i, value]) => (
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
  flex: 0;
  overflow: auto;
`;

const List = styled(FormGroup)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  transition: height 0.4s;
  overflow: auto;
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
    //display: -webkit-box;
    //-webkit-line-clamp: 2;
    //-webkit-box-orient: vertical;
  }

  & input {
    text-align: center;
  }
`;
