import { FaRegWindowRestore, FaUserFriends } from "react-icons/fa";
import { Box, Drawer, IconButton, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IoBusinessSharp } from "react-icons/io5";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "next-auth/react";

import { AppBarStyled, List, Option, TextTitle } from "./style";
import UserAvatar from "../UserAvatar";

interface Props {
  open: boolean;
  toggleDrawer: (value: boolean) => void;
  drawerWidth: number;
}

export const AdminMenu = ({ open, toggleDrawer, drawerWidth }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBarStyled
        position="fixed"
        sx={{
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: (theme) =>
              theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer(true)}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <TextTitle>HEADS SOLUTIONS</TextTitle>
          <UserAvatar name="Gabriel Eduardo de Souza" onLogout={signOut} />
        </Toolbar>
      </AppBarStyled>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": (theme) => ({
            width: drawerWidth,
            boxSizing: "border-box",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1,
            justifyContent: "flex-end",
            background: "black",
          }}
        >
          <IconButton onClick={() => toggleDrawer(false)}>
            <ChevronLeftIcon htmlColor="rgb(255, 255, 255)" />
          </IconButton>
        </Box>
        <List>
          <Option href="/admin">
            <IoBusinessSharp size={20} /> <p>EMPRESAS</p>
          </Option>
          <Option href="/admin">
            <FaRegWindowRestore size={20} /> <p>PAINÉIS</p>
          </Option>
          <Option href="/admin/users">
            <FaUserFriends size={22} /> <p>USUÁRIOS</p>
          </Option>
        </List>
      </Drawer>
    </Box>
  );
};
