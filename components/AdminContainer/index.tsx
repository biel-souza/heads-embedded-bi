"use client";

import { ReactNode, useState } from "react";
import { Box } from "@mui/material";

import { Container } from "../Container";
import { AdminMenu } from "../AdminMenu";
import { Content } from "./style";

interface Props {
  children?: ReactNode;
  loading: boolean;
}

const AdminContainer = ({ children, loading }: Props) => {
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;

  return (
    <Container loading={loading}>
      <AdminMenu open={open} toggleDrawer={() => setOpen(!open)} drawerWidth={drawerWidth} />
      <Content drawerWidth={drawerWidth} open={open}>
        {children}
      </Content>
    </Container>
  );
};

export default AdminContainer;
