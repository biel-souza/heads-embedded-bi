import { signOut, useSession } from "next-auth/react";
import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

import { Header, SelectContainer, Title } from "./style";
import { SelectInput } from "../SelectInput";
import { Container } from "../Container";
import UserAvatar from "../UserAvatar";

interface Props {
  loading: boolean;
  children: ReactNode;
  select: {
    value: number | string;
    values?: { label: string; value: string }[];
    onChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
  };
}

const DashboardContainer = ({ loading, children, select }: Props) => {
  return (
    <Container loading={loading}>
      <Header>
        <Title>DASHBOARDS</Title>
        <SelectContainer>
          <SelectInput name="panel" values={select.values} value={select.value} onChange={select.onChange} />
        </SelectContainer>
        <UserAvatar onLogout={signOut} />
      </Header>
      {children}
    </Container>
  );
};

export default DashboardContainer;
