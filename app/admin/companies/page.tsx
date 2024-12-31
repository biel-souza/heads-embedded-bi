"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { RouteButton } from "@/components/RouteButton";
import "@/styles/table.css";
import api from "@/utils/api";
import { CompanyType } from "@/types/companies";
import Pagination from "@/components/Pagination";

const Companies = () => {
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const handlePageChange = (cPage: number) => {
    console.log(cPage);
    setPage(cPage);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/companies", { params: {} });

      if (data) {
        setCompanies(
          data.map((company: CompanyType) => ({
            ...company,
            active: company.active ? "Sim" : "Não",
          }))
        );
      }
    } catch (error) {
      toast.error("Erro ao carregar empresas!");
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <Pagination itemsPerPage={10} onPageChange={handlePageChange} page={page} total={totalPages} />
      </div>
    </AdminContainer>
  );
};

export default Companies;
