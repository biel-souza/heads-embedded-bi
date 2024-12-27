import { Drawer } from "@mui/material";
import { List, Options } from "./style";

interface Props {
  open: boolean;
  toggleDrawer: (value: boolean) => void;
}

export const AdminMenu = ({ open, toggleDrawer }: Props) => {
  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)} variant="persistent">
      <List>
        <Options>Usuarios</Options>
      </List>
    </Drawer>
  );
};
