import Link from "next/link";
import * as gtag from "../../../libs/gtag";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function Character() {
  return (
    <Box margin={"auto"} textAlign={"center"}>
      <Link
        href={"https://maple.gg/u/%EC%AB%91%EC%B0%AE"}
        target={"_blank"}
        onClick={() => gtag.event({ action: "maplegg_click" })}
        style={{ width: 100 }}
      >
        <Image
          src={
            "https://avatar.maplestory.nexon.com/Character/POKGLPEJLHKIGJGHDDOGAOBLOOIBICLBHFDPPEFAFCLGGPLNNCALOOHKEFGFOLIBIOEJLMNIKAODJHDEOFBIBGOGJMJKMGICBINIBJHADDFJFKGOMNPBKIELGGIBBDGIFKIBCPDBLCLPKKDLEKNKCAJIGJELMKNKENEFINICIICFHGIKBFKPMMFMNPNDIHCBDNDOHJOHDMPEFEHHPAIIFKHHHIOFNBADPGKMGDGEANJAKFPJNPCKNFBCPLBIBAAP.png"
          }
          alt={"쫑찮"}
          width={100}
          height={100}
        />
      </Link>
      <Typography display={"flex"} gap={0.5} justifyContent={"center"} alignItems={"center"}>
        제작자 : 쫑찮
        <Image src={"https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_3.png"} alt={""} width={14} height={14} />
      </Typography>
    </Box>
  );
}
