import { Box, Divider, List } from "@mui/material";
import { TAB_LIST } from "../../../constants/common";
import TabItem from "../atoms/tabItem";
import styled from "@emotion/styled";
import Information from "../molcules/information";

export default function TabList() {
  return (
    <Container>
      <Box overflow={"auto"}>
        {TAB_LIST.filter(_ => _ === null || _.show).map((item, i) => (item ? <TabItem key={i} item={item} /> : <Divider key={i} />))}
      </Box>
      <Divider />
      <Information />
    </Container>
  );
}

const Container = styled(List)`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
  height: 100%;
`;
