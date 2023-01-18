import { Button, Card, Divider, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  CalcType,
  CoreListType,
  StackListType,
} from "../../../constants/types";
import { useRecoilValue } from "recoil";
import {
  coreListRecoil,
  jobRecoil,
  stackListRecoil,
} from "../../../constants/recoil";
import * as gtag from "../../../lib/gtag";

type Props = {
  coreCount: number;
};

export default function Calculator({ coreCount }: Props) {
  const job = useRecoilValue(jobRecoil);
  const stackList = useRecoilValue(stackListRecoil(job));
  const coreList = useRecoilValue(coreListRecoil(job));
  const [resultList, setResultList] = useState<CoreListType[]>([]);

  const resultList2 = useMemo(
    () =>
      resultList.map(result =>
        result.reduce<{ [p: string]: number }>((prev, core) => {
          core.forEach(skill => (prev[skill] = (prev[skill] ?? 0) + 1));
          return prev;
        }, {})
      ),
    [resultList]
  );

  function calc(
    stackList: StackListType,
    coreList: CoreListType,
    result: CoreListType = [],
    resultList: CoreListType[] = []
  ): CalcType {
    const stackList2 = { ...stackList };
    const coreList2 = [...coreList];
    let result2 = [...result];

    const core = coreList2.shift();
    if (core) {
      result2.push(core);
      core.forEach(_ => (stackList2[_] -= 1));
      let res: CalcType = false;
      if (!Object.values(stackList2).some(_ => _ > 0)) {
        res = [...resultList, result2];
      } else if (result.length < coreCount - 1) {
        const coreList3 = coreList2.filter(_ => _[0] !== core[0]);
        let res2: CoreListType[] = [];
        do {
          res = calc(stackList2, coreList3, result2, resultList);
          if (res) res2 = res2.concat(res);
          coreList3.shift();
        } while (res !== null);
        res = res2;
        if (!res) res = calc(stackList, coreList2, result2, resultList);
      } else {
        coreList.shift();
        res = false;
      }
      return res;
    } else {
      return null;
    }
  }

  return (
    <>
      <Button
        variant={"contained"}
        color={"secondary"}
        sx={{ flex: 0 }}
        onClick={() => {
          const res = calc(stackList, coreList);
          if (res) {
            gtag.event({
              action: "vmc_calculate",
              category: job,
              label: JSON.stringify(stackList),
              value: String((res ? res : []).length),
            });
          }
          setResultList(res ? res : []);
        }}
      >
        계산
      </Button>
      <Typography>
        <span>코어 조합 : {resultList.length}개</span>
        {resultList.length > 50 && (
          <span style={{ float: "right" }}>(최대 50개까지 출력됩니다.)</span>
        )}
      </Typography>
      <Container>
        {resultList.length
          ? resultList.slice(0, 50).map((result, i) => (
              <ResultContainer key={i}>
                <Divider
                  sx={{
                    position: "sticky",
                    top: 0,
                    bgcolor: "rgba(18,18,18,.7)",
                  }}
                >
                  코어 {i + 1}
                </Divider>
                <ResultWrapper elevation={8}>
                  {Object.entries(resultList2[i]).map(([skill, lv]) => (
                    <Typography key={skill}>{`${skill} : ${lv}`}</Typography>
                  ))}
                  <ResultContent>
                    {result.map((core, i) => (
                      <Item
                        key={i}
                        variant={"outlined"}
                        sx={{ borderRadius: 2 }}
                      >
                        {core.map(skill => (
                          <Typography key={skill}>{skill}</Typography>
                        ))}
                      </Item>
                    ))}
                  </ResultContent>
                </ResultWrapper>
              </ResultContainer>
            ))
          : "가능한 조합이 없습니다."}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: auto;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
  width: 100%;
`;

const ResultWrapper = styled(Card)`
  flex: 1;
  padding: 8px;
`;

const ResultContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding-top: 8px;
  overflow: visible;
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
