import { FormEventHandler, ReactNode } from "react";
import { RForm } from "./style";
import "@/styles/register.css";

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export const RegisterForm = ({ children, onSubmit }: Props) => {
  return <RForm onSubmit={onSubmit}>{children}</RForm>;
};
