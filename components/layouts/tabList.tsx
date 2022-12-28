import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import Link from "next/link";

export default function TabList({ tabs }: { tabs: any[] }) {
  return (
    <List sx={{ width: "100%" }}>
      {tabs.map((_, i) => (
        <ListItem key={i}>
          {_.href ? (
            <ListItemButton>
              <Link href={_.href}>{_.title}</Link>
            </ListItemButton>
          ) : (
            <ListItemText sx={{ textAlign: "center" }}>
              <Typography sx={{ fontWeight: "bold" }}>{_.title}</Typography>
            </ListItemText>
          )}
        </ListItem>
      ))}
    </List>
  );
}
