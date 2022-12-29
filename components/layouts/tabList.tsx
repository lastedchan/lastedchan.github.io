import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { TabListType } from "../../constants/types";

type Props = {
  tabs: TabListType;
};

export default function TabList({ tabs }: Props) {
  const router = useRouter();

  return (
    <List sx={{ width: "100%" }}>
      {tabs.map((_, i) => (
        <ListItem key={i} sx={{ textAlign: "center" }}>
          {_.href ? (
            <ListItemButton onClick={() => router.push(_.href ?? "/")}>
              {_.title}
            </ListItemButton>
          ) : (
            <ListItemText>
              <Typography sx={{ fontWeight: "bold" }}>{_.title}</Typography>
            </ListItemText>
          )}
        </ListItem>
      ))}
    </List>
  );
}
