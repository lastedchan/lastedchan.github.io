import { Box, Typography } from "@mui/material";
import Link from "next/link";
import * as gtag from "../../../libs/gtag";
import Image from "next/image";

export default function KakaoQRCode() {
  return (
    <Box margin={"auto"} width={100}>
      <Typography mb={1} textAlign={"center"} fontWeight={"bold"}>
        문의 및 건의사항
      </Typography>
      <Link href={"https://open.kakao.com/o/stON1QZe"} target={"_blank"} onClick={() => gtag.event({ action: "kakaotalk_click" })}>
        <Image src={"/qr.png"} alt={"QR code"} width={100} height={100} />
      </Link>
      <Typography dir={"rtl"} fontSize={"0.5em"} textOverflow={"ellipsis"} overflow={"hidden"}>
        https://open.kakao.com/o/stON1QZe
      </Typography>
    </Box>
  );
}
