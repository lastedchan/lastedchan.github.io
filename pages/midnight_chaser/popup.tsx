import styled from "@emotion/styled";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const smallImgList = [
  "/midnight_chaser/s1.png",
  "/midnight_chaser/s2.png",
  "/midnight_chaser/s3.png",
  "/midnight_chaser/s4.png",
  "/midnight_chaser/s5.png",
  "/midnight_chaser/s6.png",
  "/midnight_chaser/s7.png",
  "/midnight_chaser/s8.png",
  "/midnight_chaser/s9.png"
];

type Props = {
  opened: boolean;
  usedItem: number[];
  selectItem: Function;
};

export default function Popup({ opened, usedItem, selectItem }: Props) {
  return (
    <Container opened={opened}>
      <PopupContainer>
        <Box sx={{ width: 38, height: 38 }} onClick={() => selectItem(-1)}>
          <Typography sx={{ lineHeight: "38px", textAlign: "center" }}>
            X
          </Typography>
        </Box>
        {smallImgList.map((item, i) =>
          usedItem?.findIndex(_ => _ === i) !== -1 ? null : (
            <Box
              key={i}
              sx={{ width: 38, height: 38 }}
              onClick={() => selectItem(i)}
            >
              <Image src={item} alt={""} width={38} height={38} />
            </Box>
          )
        )}
      </PopupContainer>
    </Container>
  );
}

const Container = styled.div<{ opened: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  display: ${_ => (_.opened ? "flex" : "none")};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin: 0 16px;
  padding: 8px;
  background-color: #eee;
  border-radius: 8px;
  justify-content: center;
  flex-wrap: wrap;
`;
