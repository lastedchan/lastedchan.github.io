import styled from "@emotion/styled";
import { Button, Card, Divider, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import { coreListRecoil, jobRecoil } from "../../../constants/recoil";
import { useRecoilState, useRecoilValue } from "recoil";

export default function MyCoreList() {
  const job = useRecoilValue(jobRecoil);
  const [myCoreList, setMyCoreList] = useRecoilState(coreListRecoil(job));
  const list = useRef<HTMLDivElement>(null);

  const deleteMyCore = useCallback(
    (idx: number) =>
      confirm("해당 코어를 삭제하시겠습니까?") &&
      setMyCoreList(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]),
    [setMyCoreList]
  );

  return (
    <Container ref={list}>
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
  flex: 0 0 50%;
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
