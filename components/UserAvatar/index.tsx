import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

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
      <Avatar onClick={handleAvatarClick} style={{ cursor: "pointer", backgroundColor: "#707070" }}>
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
          <Typography variant="subtitle1">{name}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            onLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvatar;
