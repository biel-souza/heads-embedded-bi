"use client";

import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { RouteButton } from "@/components/RouteButton";
import { FaPlus } from "react-icons/fa";

const Users = () => {
  return (
    <AdminContainer loading={false}>
      <HeaderTitle title="Usuários">
        <RouteButton href="/admin/users/register" title="CADASTRAR" Icon={FaPlus} />
      </HeaderTitle>
    </AdminContainer>
  );
};

export default Users;
