"use client";

import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { RouteButton } from "@/components/RouteButton";
import Pagination from "@/components/Pagination";
import { CompanyType } from "@/types/companies.type";
import api from "@/utils/api";
import "@/styles/table.css";

const Companies = () => {
  const limit = 15;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const handlePageChange = (cPage: number) => {
    setPage(cPage);
  };

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/companies", { params: { skip: page, take: limit } });

      if (data?.data) {
        setCompanies(
          data.data.map((company: CompanyType) => ({
            ...company,
            active: company.active ? "Sim" : "Não",
          }))
        );
        setTotalPages(data.count);
      }
    } catch (error) {
      toast.error("Erro ao carregar empresas!");
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Empresas">
        <RouteButton href="/admin/companies/register" title="CADASTRAR" Icon={FaPlus} />
      </HeaderTitle>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Ativo</th>
              <th>Data de criação</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.description}</td>
                <td>{company.active}</td>
                <td>{company.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsPerPage={limit} onPageChange={handlePageChange} page={page} total={totalPages} />
      </div>
    </AdminContainer>
  );
};

export default Companies;
