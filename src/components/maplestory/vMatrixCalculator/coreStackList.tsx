import NumberField from "./numberField";
import styled from "@emotion/styled";
import { Box, FormControlLabel, FormGroup, SxProps } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { stackListType } from "../../../constants/types";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";

type Props = {
  job: string;
  coreStackList: stackListType;
  setCoreStackList: Dispatch<SetStateAction<stackListType>>;
  sx?: SxProps;
};

export default function CoreStackList({
  job,
  coreStackList,
  setCoreStackList,
  sx,
}: Props) {
  // 중첩 코어 횟수 저장
  useEffect(() => {
    if (job && Object.values(coreStackList).length) {
      localStorage.setItem(
        COOKIE_PREFIX_V_MATRIX_CALCULATOR + "core_stack_" + job,
        JSON.stringify(coreStackList)
      );
    }
  }, [coreStackList, job]);

  const onCoreChange = (idx: string, value: number) => {
    if (isNaN(value)) return false;
    setCoreStackList(prev => ({ ...prev, [idx]: value }));
  };

  return (
    <Container sx={sx}>
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
`;

const List = styled(FormGroup)`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: column;
  transition: height 0.4s;
  overflow: auto;
`;

const Item = styled(FormControlLabel)`
  flex-direction: column;
  margin: 0;
  padding: 8px;
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
