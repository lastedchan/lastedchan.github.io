import NumberField from "../../numberField";
import styled from "@emotion/styled";
import { Button, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CoreStackListType } from "../../../constants/types";
import { Cookies } from "react-cookie";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";

type Props = {
  coreStackList: CoreStackListType;
  setCoreStackList: Dispatch<SetStateAction<CoreStackListType>>;
  job: string;
};

const COOKIE_NAME = COOKIE_PREFIX_V_MATRIX_CALCULATOR + "core_stack_list_show";

export default function CoreStackList({
  coreStackList,
  setCoreStackList,
  job,
}: Props) {
  const [show, setShow] = useState<boolean>();

  useEffect(
    () => setShow((new Cookies().get(COOKIE_NAME) ?? "true") === "true"),
    []
  );
  useEffect(() => {
    show !== undefined && new Cookies().set(COOKIE_NAME, show);
  }, [show]);

  const onCoreChange = (idx: string, value: number) => {
    setCoreStackList(prev => ({ ...prev, [idx]: value }));
  };

  return (
    <Container>
      <Typography variant={"h6"} sx={{ mt: 1 }}>
        코어 중첩 횟수 설정
      </Typography>
      <List
        sx={{
          height: show
            ? Math.min(
                94.75 * Math.ceil(Object.values(coreStackList).length / 2),
                260
              )
            : 60,
          pointerEvents: show ? "all" : "none",
        }}
      >
        {job && coreStackList ? (
          Object.entries(coreStackList).map(([i, value]) => (
            <Item
              key={i}
              control={
                <NumberField idx={i} value={value} onChange={onCoreChange} />
              }
              label={i}
            />
          ))
        ) : (
          <span>직업을 선택해주세요.</span>
        )}
      </List>
      <Button
        sx={{ mt: -0.5 }}
        variant={"contained"}
        onClick={() => setShow(prev => !prev)}
      >
        {show ? "▲" : "▼"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const List = styled(FormGroup)`
  flex-direction: row;
  transition: height 0.4s;
  overflow: auto;
`;

const Item = styled(FormControlLabel)`
  flex-direction: column;
  flex: 0 1 50%;
  margin: 0;
  padding: 8px;
  overflow: hidden;

  & > span {
    display: -webkit-box;
    width: 100%;
    height: 3em;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  & input {
    text-align: center;
  }
`;
