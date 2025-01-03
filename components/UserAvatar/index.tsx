import { Avatar, Menu, MenuItem } from "@mui/material";
import { PiSignOutBold } from "react-icons/pi";
import React, { useState } from "react";

import { Text, TextInfo } from "./style";
import { colors } from "@/utils/colors";

interface Props {
  name: string;
  onLogout: () => void;
}

const UserAvatar = ({ name, onLogout }: Props) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const menuOpen = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
      <Avatar onClick={handleAvatarClick} style={{ cursor: "pointer", backgroundColor: colors.default }}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          <TextInfo>{name}</TextInfo>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            onLogout();
          }}
        >
          <PiSignOutBold />
          <Text>Sair</Text>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvatar;
