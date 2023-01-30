import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { TabListType } from "../../constants/types";
import { isString } from "lodash";

type Props = {
  tabList: TabListType;
};

export default function TabList({ tabList }: Props) {
  const router = useRouter();

  return (
    <List sx={{ width: "100%" }}>
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
                {isString(item.title) ? (
                  <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                ) : (
                  item.title
                )}
              </ListItemText>
            )
          ) : (
            <Divider key={i} />
          )
        )}
    </List>
  );
}
