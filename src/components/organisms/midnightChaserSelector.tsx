import styled from "@emotion/styled";
import { Card } from "@mui/material";
import { smallImgList } from "../../constants/midnightChaser";
import { SlotType } from "../../types/midnight_chaser";
import MidnightChaserSelectorItem from "../molcules/midnightChaserSelectorItem";

type Props = { slotList: SlotType; isPortrait: boolean };

export default function MidnightChaserSelector({ slotList, isPortrait }: Props) {
  return (
    <Container isPortrait={isPortrait}>
      <PopupContainer>
        {smallImgList.map((item, i) => (
          <MidnightChaserSelectorItem
            key={i}
            item={item}
            i={i}
            visibility={slotList?.findIndex(_ => _ === i) !== -1 ? "hidden" : "visible"}
          />
        ))}
      </PopupContainer>
    </Container>
  );
}

const Container = styled.div<{ isPortrait: boolean }>`
  flex: 1 0;
  display: flex;
  padding: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled(Card)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
