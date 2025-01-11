"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardContainer from "@/components/DashboardContainer";
import { PowerBIEmbed } from "@/components/PowerBiEmbedded";
import api from "@/utils/api";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState("");
  const [token, setToken] = useState("");

  const getToken = async () => {
    setLoading(true);
    try {
      if (!token && status === "authenticated" && session?.user.company) {
        const body = {
          client_id: session?.user.company.pbi_client_id as string,
          password: session?.user.company.pbi_password as string,
          username: session?.user.company.pbi_user as string,
        };

        const { data } = await api.post("/login/tokenbi", body);

        setToken(data);
      }
    } catch (error) {
      toast.error("Erro ao buscar token");
    }
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, [status]);

  return (
    <DashboardContainer
      loading={loading}
      select={{
        value: reportId,
        onChange: (e) => setReportId(e.target.value as string),
        values: session?.user.panels.map((panel) => ({ value: panel.report_id, label: panel.description })),
      }}
    >
      {token && <PowerBIEmbed reportId={reportId} token={token} />}
    </DashboardContainer>
  );
};

export default Dashboard;
