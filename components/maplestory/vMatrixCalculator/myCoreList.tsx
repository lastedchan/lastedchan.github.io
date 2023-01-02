import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";

type Props = {
  coreList: string[];
};

export default function MyCoreList({ coreList }: Props) {
  return (
    <Container>
      <ButtonContainer>
        {coreList.map(item => (
          <Button key={item} variant={"outlined"}>
            <Typography>{item}</Typography>
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  & p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
