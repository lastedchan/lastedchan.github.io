import { Box, ListItem } from "@mui/material";
import KakaoQRCode from "../atoms/kakaoQRCode";
import Character from "../atoms/character";

export default function Information() {
  return (
    <Box>
      <ListItem>
        <KakaoQRCode />
      </ListItem>
      <ListItem>
        <Character />
      </ListItem>
    </Box>
  );
}
