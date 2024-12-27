"use client";

import { ReactNode, useState } from "react";
import { Container } from "../Container";
import { AdminMenu } from "../AdminMenu";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  children?: ReactNode;
  loading: boolean;
}

const AdminContainer = ({ children, loading }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Container loading={loading}>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AdminMenu open={open} toggleDrawer={setOpen} />
      {children}
    </Container>
  );
};

export default AdminContainer;
