"use client";

import React, { useEffect, useRef, useState } from "react";
import * as powerbi from "powerbi-client";
import { Container } from "./style";

interface Props {
  token: string;
  reportId: string;
  filters?: string;
}

const PowerBIEmbed = ({ token, reportId, filters }: Props) => {
  const mobileWidth = 900;
  const embedContainer = useRef(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window != "undefined" && window.innerWidth < mobileWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BI_EMBEDDED_URL && token && reportId && embedContainer.current) {
      const powerbiService = new powerbi.service.Service(
        powerbi.factories.hpmFactory,
        powerbi.factories.wpmpFactory,
        powerbi.factories.routerFactory
      );

      let filter: any = [];

      if (filters) {
        const regex = /(\{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*\})/g;
        const matches = [];
        let match;

        while ((match = regex.exec(filters)) !== null) {
          matches.push(match[0]);
        }

        filter = matches.map((json) => {
          return eval("(" + json + ")");
        });
      }

      const config: powerbi.service.IComponentEmbedConfiguration = {
        type: "report",
        id: reportId,
        embedUrl: process.env.NEXT_PUBLIC_BI_EMBEDDED_URL,
        accessToken: token,
        tokenType: powerbi.models.TokenType.Aad,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: isMobile ? false : true,
          layoutType: isMobile ? powerbi.models.LayoutType.MobileLandscape : powerbi.models.LayoutType.Custom,
        },
        filters: filter,
      };

      powerbiService.reset(embedContainer.current);
      powerbiService.embed(embedContainer.current, config);
    }
  }, [token, reportId, filters, isMobile]);

  return <Container ref={embedContainer} />;
};

export default PowerBIEmbed;
