"use client";

import React, { useEffect, useRef } from "react";
import * as powerbi from "powerbi-client";
import { Container } from "./style";
import dynamic from "next/dynamic";

interface Props {
  token: string;
  reportId: string;
  filters?: string;
}

const PowerBIEmbed = ({ token, reportId, filters }: Props) => {
  const embedContainer = useRef(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BI_EMBEDDED_URL && token && reportId && embedContainer.current) {
      const powerbiService = new powerbi.service.Service(
        powerbi.factories.hpmFactory,
        powerbi.factories.wpmpFactory,
        powerbi.factories.routerFactory
      );

      const filter: any = [];

      if (filters) {
        const posicao = filters.indexOf("{");

        const resultado = filters.substring(posicao);
        filter.push(eval("(" + resultado + ")"));
      }

      const config: powerbi.service.IComponentEmbedConfiguration = {
        type: "report",
        id: reportId,
        embedUrl: process.env.NEXT_PUBLIC_BI_EMBEDDED_URL,
        accessToken: token,
        tokenType: powerbi.models.TokenType.Aad,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: true,
        },
        filters: filter,
      };

      powerbiService.reset(embedContainer.current);
      powerbiService.embed(embedContainer.current, config);
    }
  }, [token, reportId, filters]);

  return <Container ref={embedContainer} />;
};

export default PowerBIEmbed;
