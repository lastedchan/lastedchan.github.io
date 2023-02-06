import { TabType } from "../../../types";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  item: TabType;
};

export default function TabItem({ item }: Props) {
  const router = useRouter();

  return item.href ? (
    <ListItemButton sx={{ justifyContent: "center" }} onClick={() => router.push(item.href ?? "/")}>
      {item.title}
    </ListItemButton>
  ) : (
    <ListItemText sx={{ m: 0, p: 1 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>{item.title}</Typography>
    </ListItemText>
  );
}
