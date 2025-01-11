"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <SessionProvider>{children}</SessionProvider>
        </Suspense>
        <ToastContainer />
      </body>
    </html>
  );
}
