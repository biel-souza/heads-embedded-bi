import { AppBar } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

export const AppBarStyled = styled(AppBar)`
  background-color: black;
`;

export const TextTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const List = styled.div`
  padding: 5px 0px;
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: rgb(230, 230, 230);
  height: 100%;
`;

export const Option = styled(Link)`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 15px 10px;
  color: black;
  font-weight: bold;
  align-items: center;
  p {
    margin-left: 5px;
  }
`;
