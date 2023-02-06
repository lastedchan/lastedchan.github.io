import styled from "@emotion/styled";
import { Button, Card, Divider, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as gtag from "../../libs/gtag";
import { coreListRecoil, jobRecoil } from "../../recoils/v_matrix_calculator";

export default function CoreList() {
  const job = useRecoilValue(jobRecoil);
  const [coreList, setCoreList] = useRecoilState(coreListRecoil(job));
  const list = useRef<HTMLDivElement>(null);

  const deleteMyCore = useCallback(
    (idx: number) => {
      if (confirm("해당 코어를 삭제하시겠습니까?")) {
        gtag.event({
          action: "vmc_remove_core",
          category: job,
          label: JSON.stringify(coreList[idx]),
          value: String(coreList.length - 1),
        });
        setCoreList(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
      }
    },
    [coreList, job, setCoreList]
  );

  return (
    <Container ref={list}>
      {coreList.length ? (
        coreList.map((skills, i) => (
          <Wrapper key={i}>
            <Item variant={"outlined"}>
              {skills.map((skill, i) => (
                <Typography key={i}>{skill}</Typography>
              ))}
              <Divider />
              <Button size={"small"} color={"error"} onClick={() => deleteMyCore(i)}>
                삭제
              </Button>
            </Item>
          </Wrapper>
        ))
      ) : (
        <Typography flex={1} textAlign={"center"}>
          코어를 추가해주세요.
        </Typography>
      )}
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
