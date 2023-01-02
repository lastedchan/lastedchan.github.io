import styled from "@emotion/styled";
import { Button, Card, Divider, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Cookies } from "react-cookie";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";

type Props = {
  job: string;
  myCoreList: string[][];
  setMyCoreList: Dispatch<SetStateAction<string[][]>>;
};

const COOKIE_NAME = COOKIE_PREFIX_V_MATRIX_CALCULATOR + "my_core_list_";

export default function MyCoreList({ job, myCoreList, setMyCoreList }: Props) {
  useEffect(
    () => setMyCoreList(new Cookies().get(COOKIE_NAME + encodeURI(job)) ?? []),
    [job, setMyCoreList]
  );
  useEffect(() => {
    if (job && myCoreList.length)
      new Cookies().set(COOKIE_NAME + encodeURI(job), myCoreList);
  }, [job, myCoreList]);

  const deleteMyCore = useCallback(
    (idx: number) =>
      confirm("해당 코어를 삭제하시겠습니까?") &&
      setMyCoreList(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]),
    [setMyCoreList]
  );

  return (
    <Container>
      {myCoreList.map((skills, i) => (
        <Wrapper key={i}>
          <Item variant={"outlined"}>
            {skills.map((skill, i) => (
              <Typography key={i}>{skill}</Typography>
            ))}
            <Divider />
            <Button
              size={"small"}
              color={"error"}
              onClick={() => deleteMyCore(i)}
            >
              삭제
            </Button>
          </Item>
        </Wrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
`;

const Wrapper = styled.div`
  flex: 0 0 33.3333%;
  padding: 4px;
  overflow: hidden;
`;

const Item = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  justify-content: center;
  & p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
