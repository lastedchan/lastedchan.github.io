import TabList from "../src/components/layouts/tabList";
import { tabList } from "../src/constants/common";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <Container>
      <TabList tabList={tabList} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
