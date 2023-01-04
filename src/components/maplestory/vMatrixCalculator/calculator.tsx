import { Button, Card, Dialog, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { CoreListType, stackListType } from "../../../constants/types";

type Props = {
  coreStackList: stackListType;
  myCoreList: string[][];
  coreCount: number;
};

export default function Calculator({
  coreStackList,
  myCoreList,
  coreCount,
}: Props) {
  const [resultList, setResultList] = useState<CoreListType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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

  type CalcType = CoreListType[] | false | null;

  let iii = 1000;
  function calc(
    stackList: stackListType,
    coreList: CoreListType,
    result: CoreListType = [],
    resultList: CoreListType[] = []
  ): CalcType {
    if (!iii--) return null;
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Container>
          {resultList.length
            ? resultList.map((result, i) => (
                <ResultContainer key={i}>
                  {/*<ResultHead>
                    <Item>
                      {Object.entries(resultList2[i]).map(([skill, lv]) => (
                        <Typography
                          key={skill}
                        >{`${skill} : ${lv}`}</Typography>
                      ))}
                    </Item>
                  </ResultHead>*/}
                  <ResultContent>
                    {result.map((core, i) => (
                      <ResultWrapper key={i}>
                        <Item>
                          {core.map(skill => (
                            <Typography key={skill}>{skill}</Typography>
                          ))}
                        </Item>
                      </ResultWrapper>
                    ))}
                  </ResultContent>
                </ResultContainer>
              ))
            : "가능한 조합이 없습니다."}
        </Container>
      </Dialog>
      <Button
        variant={"contained"}
        color={"secondary"}
        sx={{ flex: 0 }}
        onClick={() => {
          setOpen(true);
          const res = calc(coreStackList, myCoreList);
          setResultList(res ? res : []);
        }}
      >
        계산
      </Button>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: auto;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 85%;
`;

const ResultHead = styled.div`
  flex: 1;
  padding: 4px;
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  justify-content: flex-start;
  justify-items: flex-start;
  align-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;
`;

const ResultWrapper = styled.div`
  flex: 1 0 40%;
  padding: 4px;
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
