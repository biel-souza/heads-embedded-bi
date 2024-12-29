import { ReactNode } from "react";
import { Container, Title } from "./style";

interface Props {
  title: string;
  children?: ReactNode;
}

export const HeaderTitle = ({ title, children }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};
