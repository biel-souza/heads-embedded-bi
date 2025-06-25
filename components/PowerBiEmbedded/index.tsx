"use client";

import React, { useEffect, useRef, useState } from "react";
import * as powerbi from "powerbi-client";
import { Container } from "./style";

interface Props {
  token: string;
  reportId: string;
  filters?: string;
  isMobileModeActive: boolean;
}

const PowerBIEmbed = ({ token, reportId, filters, isMobileModeActive }: Props) => {
  const mobileWidth = 900;
  const embedContainer = useRef(null);
  const [filterPage, setFilterPage] = useState({ page: "", filter: [] });
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

      let useFilters = filter.filter((f: any) => !f.target.pageName).map((f: any) => f);

      if (filterPage.filter.length) {
        useFilters = filterPage.filter;
      }

      const mobileLayout = isMobileModeActive
        ? powerbi.models.LayoutType.MobilePortrait
        : powerbi.models.LayoutType.MobileLandscape;

      const config: powerbi.service.IComponentEmbedConfiguration = {
        type: "report",
        id: reportId,
        embedUrl: process.env.NEXT_PUBLIC_BI_EMBEDDED_URL,
        accessToken: token,
        tokenType: powerbi.models.TokenType.Aad,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: isMobile ? false : true,
          layoutType: isMobile ? mobileLayout : powerbi.models.LayoutType.Custom,
          customLayout: {
            displayOption: powerbi.models.DisplayOption.FitToWidth,
          },
        },
        filters: useFilters,
        pageName: filterPage.page,
      };

      powerbiService.reset(embedContainer.current);
      const report = powerbiService.embed(embedContainer.current, config) as powerbi.Report;

      report.on("loaded", async () => {
        if (filter.length) {
          try {
            const pages = await report.getPages();

            if (pages.length) {
              const activePage = pages.find((page) => page.isActive) || pages[0];

              if (activePage.name != filterPage.page) {
                const initialPageFilters = filter
                  .filter((f: any) => f.target.pageName === activePage.displayName)
                  .map((f: any) => f);

                if (initialPageFilters.length > 0) {
                  setFilterPage({ page: activePage.name, filter: initialPageFilters });
                }
              }
            }

            report.on("pageChanged", async (event: any) => {
              const currentPageName = event.detail.newPage;

              const pageFilters = filter
                .filter((f: any) => f.target.pageName === currentPageName.displayName)
                .map((f: any) => f);

              if (pageFilters.length > 0 && currentPageName.name != filterPage.page) {
                setFilterPage({ page: currentPageName.name, filter: pageFilters });
              }
            });
          } catch (error) {
            console.error("Erro ao aplicar filtros:", error);
          }
        }
      });
    }
  }, [token, reportId, filters, isMobile, filterPage]);

  return <Container ref={embedContainer} />;
};

export default PowerBIEmbed;
