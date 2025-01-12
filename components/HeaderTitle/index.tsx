import { ReactNode } from "react";
import { Buttons, Container, Title } from "./style";

interface Props {
  title: string;
  children?: ReactNode;
}

export const HeaderTitle = ({ title, children }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Buttons>{children}</Buttons>
    </Container>
  );
};
