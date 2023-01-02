import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { TabListType } from "../../constants/types";

type Props = {
  tabList: TabListType;
};

export default function TabList({ tabList }: Props) {
  const router = useRouter();

  return (
    <List sx={{ width: "100%" }}>
      {tabList.map((item, i) =>
        item.title ? (
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
    </List>
  );
}
