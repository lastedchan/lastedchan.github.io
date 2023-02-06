import MapItem from "../atoms/mapItem";
import styled from "@emotion/styled";
import { OrientationType } from "../../../types";
import useOrientation from "../../../hooks/useOrientation";
import { useRecoilState } from "recoil";
import { slotListRecoil } from "../../../recoils/midnightChaser";
import { Box } from "@mui/material";

export default function Map() {
  const [slotList, setSlotList] = useRecoilState(slotListRecoil);
  const orientation = useOrientation();

  return (
    <Container orientation={orientation}>
      {slotList.map((item, i) => (
        <Box key={i} onClick={() => setSlotList(prev => [...prev.slice(0, i), -1, ...prev.slice(i + 1)])}>
          <MapItem idx={i} item={item} />
        </Box>
      ))}
    </Container>
  );
}

const Container = styled.div<{ orientation: OrientationType }>`
  flex: 0 1 ${_ => (_.orientation === "portrait" ? "100vw" : "calc(100vh - 69px)")};
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  gap: 8px;
  justify-content: center;
  align-items: center;
`;
