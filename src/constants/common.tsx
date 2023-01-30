import { TabListType } from "./types";
import Image from "next/image";
import Link from "next/link";
import VMatrixCalculatorHelp from "../components/maplestory/vMatrixCalculator/vMatrixCalculatorHelp";
import * as gtag from "../lib/gtag";
import { Box, Typography } from "@mui/material";

export const topTitle = "LASTCHAN";

export const tabList: TabListType = [
  { title: "HOME", show: true, href: "/" },
  null,
  { title: "MapleStory", show: true },
  {
    title: "V 매트릭스 계산기",
    show: true,
    href: "/v_matrix_calculator",
    help: <VMatrixCalculatorHelp />,
  },
  { title: "결정석 수익 계산기", show: true, href: "/crystal_calculator" },
  { title: "미드나잇 체이서 도우미", show: false, href: "/midnight_chaser" },
  null,
  { title: "문의 및 건의사항", show: true },
  {
    title: (
      <Box margin={"auto"} width={150}>
        <Link
          href={"https://open.kakao.com/o/stON1QZe"}
          target={"_blank"}
          onClick={() => gtag.event({ action: "kakaotalk_click" })}
        >
          <Image src={"/qr.png"} alt={"QR code"} width={600} height={600} />
        </Link>
      </Box>
    ),
    show: true,
  },
  {
    title: (
      <Box margin={"auto"} width={150} textAlign={"center"}>
        <Typography fontWeight={"bold"}>제작자</Typography>
        <Link
          href={"https://maple.gg/u/%EC%AB%91%EC%B0%AE"}
          target={"_blank"}
          onClick={() => gtag.event({ action: "maplegg_click" })}
        >
          <Image
            src={
              "https://avatar.maplestory.nexon.com/Character/POKGLPEJLHKIGJGHDDOGAOBLOOIBICLBHFDPPEFAFCLGGPLNNCALOOHKEFGFOLIBIOEJLMNIKAODJHDEOFBIBGOGJMJKMGICBINIBJHADDFJFKGOMNPBKIELGGIBBDGIFKIBCPDBLCLPKKDLEKNKCAJIGJELMKNKENEFINICIICFHGIKBFKPMMFMNPNDIHCBDNDOHJOHDMPEFEHHPAIIFKHHHIOFNBADPGKMGDGEANJAKFPJNPCKNFBCPLBIBAAP.png"
            }
            alt={"쫑찮"}
            width={168}
            height={168}
          />
        </Link>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Typography style={{ display: "block", width: 14, height: 14 }}>
            <Image
              src={
                "https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_3.png"
              }
              alt={""}
              width={14}
              height={14}
            />
          </Typography>
          <Typography>쫑찮</Typography>
        </Box>
      </Box>
    ),
    show: true,
  },
];
