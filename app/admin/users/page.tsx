"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { RouteButton } from "@/components/RouteButton";
import type { UserType } from "@/types/users.type";
import Pagination from "@/components/Pagination";
import api from "@/utils/api";
import "@/styles/table.css";

const Users = () => {
  const limit = 15;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState<UserType[]>([]);
  const router = useRouter();

  const handlePageChange = (cPage: number) => {
    setPage(cPage);
  };

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users", { params: {} });

      if (data.data) {
        setUsers(data.data);
        setTotalPages(data.count);
      }
    } catch (error) {
      toast.error("Erro ao buscar usuários!");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Usuários">
        <RouteButton href="/admin/users/register" title="CADASTRAR" Icon={FaPlus} />
      </HeaderTitle>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Empresa</th>
              <th>Ativo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((panel) => (
              <tr key={panel.id}>
                <td>{panel.id}</td>
                <td>{panel.name}</td>
                <td>{panel.user}</td>
                <td>{panel.userCompanies?.[0]?.company.description}</td>
                <td>{panel.active ? "Sim" : "Não"}</td>
                <td>
                  <div className="buttons-table">
                    <button onClick={() => router.push(`/admin/users/edit?id=${panel.id}`)}>
                      <MdEdit size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsPerPage={limit} onPageChange={handlePageChange} page={page} total={totalPages} />
      </div>
    </AdminContainer>
  );
};

export default Users;
