"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { RouteButton } from "@/components/RouteButton";
import { SelectInput } from "@/components/SelectInput";
import { InputText } from "@/components/InputText";
import { DateInput } from "@/components/DateInput";
import type { UserType } from "@/types/users.type";
import Pagination from "@/components/Pagination";
import "@/styles/filters.css";
import api from "@/utils/api";
import "@/styles/table.css";

const Users = () => {
  const limit = 15;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState<UserType[]>([]);
  const router = useRouter();
  const [filters, setFilters] = useState({ company_id: "", name: "", last_login_at: "", active: "" });
  const [companies, setCompanies] = useState([{ value: "", label: "Todos" }]);

  const handlePageChange = (cPage: number) => {
    setPage(cPage);
  };

  const handleFilter = (obj: object) => {
    setFilters({ ...filters, ...obj });
  };

  const getCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/companies");

      const compa = data.data.map((comp: any) => ({
        value: comp.id,
        label: comp.description,
      }));

      setCompanies([...companies, ...compa]);
    } catch (err) {
      toast.error("Erro ao buscar empresas!");
    }
    setLoading(false);
  }, []);

  const deleteUser = async (user_id: number) => {
    setLoading(true);
    try {
      await api.delete(`/users/${user_id}`);

      getUsers();
      toast.success("Deletado com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar usuario!");
    }
    setLoading(false);
  };

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users", { params: { take: limit, skip: page * limit, where: filters } });

      if (data.data) {
        setUsers(data.data);
        setTotalPages(data.count);
      }
    } catch (error) {
      toast.error("Erro ao buscar usuários!");
    }
    setLoading(false);
  }, [page, filters]);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Usuários">
        <RouteButton href="/admin/users/register" title="CADASTRAR" Icon={FaPlus} />
      </HeaderTitle>
      <div className="filters">
        <div className="filter">
          <InputText
            type="text"
            name="name"
            placeholder="Nome"
            value={filters.name}
            label="Nome"
            onChange={(e) => handleFilter({ name: e.target.value as string })}
          />
        </div>
        <div className="filter">
          <SelectInput
            name="name"
            label="Empresa"
            value={filters.company_id}
            values={companies}
            onChange={(e) => handleFilter({ company_id: e.target.value as string })}
          />
        </div>
        <div className="filter">
          <DateInput
            name="last_login_at"
            label="Último Login"
            value={filters.last_login_at || ""}
            onChange={(e) => handleFilter({ last_login_at: e.target.value })}
          />
        </div>
        <div className="filter">
          <SelectInput
            name="active"
            label="Ativo"
            value={filters.active}
            values={[
              { value: "", label: "Todos" },
              { value: "true", label: "Sim" },
              { value: "false", label: "Não" },
            ]}
            onChange={(e) => handleFilter({ active: e.target.value })}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Empresa</th>
              <th>Ativo</th>
              <th>Último login</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.user}</td>
                <td>{user.userCompanies?.[0]?.company.description}</td>
                <td>{user.active ? "Sim" : "Não"}</td>
                <td>{user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : "-"}</td>
                <td>
                  <div className="buttons-table">
                    <button onClick={() => router.push(`/admin/users/edit?id=${user.id}`)}>
                      <MdEdit size={20} />
                    </button>
                    <button onClick={() => deleteUser(user.id)}>
                      <MdDelete size={20} />
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
