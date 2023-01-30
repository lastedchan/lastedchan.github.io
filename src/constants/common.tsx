import { TabListType } from "./types";
import Image from "next/image";
import Link from "next/link";

export const topTitle = "LASTCHAN";

export const tabList: TabListType = [
  { title: "HOME", href: "/", show: true },
  null,
  { title: "MapleStory", show: true },
  { title: "V 매트릭스 계산기", href: "/v_matrix_calculator", show: true },
  { title: "결정석 수익 계산기", href: "/crystal_calculator", show: true },
  { title: "미드나잇 체이서 도우미", href: "/midnight_chaser", show: false },
  null,
  { title: "문의 및 건의사항", show: true },
  {
    title: (
      <span style={{ display: "block", margin: "auto", width: 150 }}>
        <Link href={"https://open.kakao.com/o/stON1QZe"} target={"_blank"}>
          <Image src={"/qr.png"} alt={"QR code"} width={600} height={600} />
        </Link>
      </span>
    ),
    show: true,
  },
];
