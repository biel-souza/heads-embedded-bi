"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { RouteButton } from "@/components/RouteButton";
import type { PanelType } from "@/types/panels.type";
import Pagination from "@/components/Pagination";
import api from "@/utils/api";
import "@/styles/table.css";

const Panels = () => {
  const limit = 15;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [panels, setPanels] = useState<PanelType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const status: { [value: string]: string } = {
    finished: "Finalizado",
    development: "Desenvolvimento",
  };

  const handlePageChange = (cPage: number) => {
    setPage(cPage);
  };

  const getCompanies = async () => {
    const { data } = await api.get("/companies");

    const companies: { [value: number]: string } = {};

    for (const company of data.data) {
      companies[company.id] = company.description;
    }

    return companies;
  };

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/panels", { params: { skip: page, take: limit } });
      const companies = await getCompanies();

      if (data.data) {
        setPanels(
          data.data.map((panel: PanelType) => ({
            ...panel,
            company_id: companies[panel.company_id],
          }))
        );
        setTotalPages(data.count);
      }
    } catch (error) {
      toast.error("Erro ao buscar dados!");
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Painéis">
        <RouteButton href="/admin/panels/register" title="CADASTRAR" Icon={FaPlus} />
      </HeaderTitle>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Empresa</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {panels.map((panel) => (
              <tr key={panel.id}>
                <td>{panel.id}</td>
                <td>{panel.description}</td>
                <td>{panel.company_id}</td>
                <td>{status[panel.status]}</td>
                <td>
                  <div className="buttons-table">
                    <button onClick={() => router.push(`/admin/panels/edit?id=${panel.id}`)}>
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

export default Panels;
