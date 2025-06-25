"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const PowerBIEmbed = dynamic(() => import("@/components/PowerBiEmbedded"), { ssr: false });
import DashboardContainer from "@/components/DashboardContainer";
import api from "@/utils/api";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState(
    session?.user?.panels?.length == 1 ? session?.user?.panels[0]?.report_id : ""
  );
  const [token, setToken] = useState("");
  const [filter, setFilter] = useState("");
  const [mobileMode, setMobileMode] = useState(session?.user.company.mobile_mode ?? false);

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
      console.log(error);
      toast.error("Erro ao buscar token");
    }
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, [status]);

  useEffect(() => {
    if (reportId || session?.user.panels?.length == 1) {
      const panel = session?.user?.panels?.filter((panel) => panel?.report_id == reportId)[0];

      if (panel?.filter) {
        setFilter(panel.filter);
      }
    }
  }, [reportId, session?.user?.panels]);

  useEffect(() => {
    setMobileMode(session?.user.company?.mobile_mode ?? false);
  }, [session?.user.company.mobile_mode]);

  return (
    <DashboardContainer
      loading={loading}
      select={{
        value: reportId,
        onChange: (e) => setReportId(e.target.value as string),
        values: session?.user.panels.map((panel) => ({ value: panel.report_id, label: panel.description })),
      }}
    >
      {token && <PowerBIEmbed reportId={reportId} token={token} filters={filter} isMobileModeActive={mobileMode} />}
    </DashboardContainer>
  );
};

export default Dashboard;
