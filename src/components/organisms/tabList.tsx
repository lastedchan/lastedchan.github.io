import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import * as gtag from "../../libs/gtag";
import Image from "next/image";
import { TabListType } from "../../types";

type Props = {
  tabList: TabListType;
};

export default function TabList({ tabList }: Props) {
  const router = useRouter();

  return (
    <List
      sx={{
        display: "grid",
        gridTemplateRows: "1fr auto",
        width: "100%",
        height: "100%",
      }}
    >
      <Box overflow={"auto"}>
        {tabList
          .filter(_ => _ === null || _.show)
          .map((item, i) =>
            item ? (
              item.href ? (
                <ListItemButton
                  key={i}
                  sx={{ justifyContent: "center" }}
                  onClick={() => router.push(item.href ?? "/")}
                >
                  {item.title}
                </ListItemButton>
              ) : (
                <ListItemText key={i} sx={{ m: 0, p: 1 }}>
                  <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                </ListItemText>
              )
            ) : (
              <Divider key={i} />
            )
          )}
      </Box>
      <Box>
        <Divider />
        <ListItem>
          <Box margin={"auto"} width={100}>
            <Typography mb={1} textAlign={"center"} fontWeight={"bold"}>
              문의 및 건의사항
            </Typography>
            <Link
              href={"https://open.kakao.com/o/stON1QZe"}
              target={"_blank"}
              onClick={() => gtag.event({ action: "kakaotalk_click" })}
            >
              <Image src={"/qr.png"} alt={"QR code"} width={100} height={100} />
            </Link>
            <Typography
              dir={"rtl"}
              fontSize={"0.5em"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
            >
              https://open.kakao.com/o/stON1QZe
            </Typography>
          </Box>
        </ListItem>
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
          <Typography
            display={"flex"}
            gap={0.5}
            justifyContent={"center"}
            alignItems={"center"}
          >
            제작자 :{" "}
            <Image
              src={
                "https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_3.png"
              }
              alt={""}
              width={14}
              height={14}
            />
            쫑찮
          </Typography>
        </Box>
      </Box>
    </List>
  );
}
