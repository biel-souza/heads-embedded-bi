"use client";

import React, { useEffect, useRef } from "react";
import * as powerbi from "powerbi-client";
import { Container } from "./style";

interface Props {
  token: string;
  reportId: string;
  filters?: string;
}

export const PowerBIEmbed = ({ token, reportId, filters }: Props) => {
  const embedContainer = useRef(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BI_EMBEDDED_URL && token && reportId && embedContainer.current) {
      const powerbiService = new powerbi.service.Service(
        powerbi.factories.hpmFactory,
        powerbi.factories.wpmpFactory,
        powerbi.factories.routerFactory
      );

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
      };

      powerbiService.reset(embedContainer.current);
      powerbiService.embed(embedContainer.current, config);
    }
  }, [token, reportId]);

  return <Container ref={embedContainer} />;
};
