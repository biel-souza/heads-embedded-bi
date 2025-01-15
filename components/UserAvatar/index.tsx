import { Avatar, Menu, MenuItem } from "@mui/material";
import { PiSignOutBold } from "react-icons/pi";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { Text, TextInfo } from "./style";

interface Props {
  onLogout: () => void;
}

const UserAvatar = ({ onLogout }: Props) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [name, setName] = useState("");
  const menuOpen = Boolean(anchorEl);
  const { data: session, status } = useSession();

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (status === "authenticated") {
      setName(session?.user.name as string);
    }
  }, [status]);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
      <Avatar onClick={handleAvatarClick} style={{ cursor: "pointer", backgroundColor: "gray" }}>
        {name?.charAt(0).toUpperCase()}
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
