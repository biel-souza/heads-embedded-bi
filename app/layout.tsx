import type { Metadata } from "next";

import { Provider } from "@/components/Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heads Consultoria",
  description: "Heads Consultoria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
