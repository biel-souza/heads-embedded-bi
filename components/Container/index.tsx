"use client";

import { ReactNode } from "react";

import { LoaderImage, LoaderContainer } from "./style";
import logo from "@/images/logo-bg.png";

interface Props {
  loading: boolean;
  children: ReactNode;
}

export const Container = ({ loading, children }: Props) => {
  return (
    <>
      {children}
      {loading && (
        <LoaderContainer>
          <LoaderImage src={logo.src} />
        </LoaderContainer>
      )}
    </>
  );
};
