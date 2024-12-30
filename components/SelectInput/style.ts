import { Select } from "@mui/material";
import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: rgb(88, 88, 88);
`;

export const Error = styled.div`
  color: rgb(122, 0, 0);
  font-size: 12px;
  padding: 5px;
`;

export const SelectStyled = styled(Select)`
  width: 100%;
  height: 40px;
  border: 1px solid rgb(143, 143, 143);
  color: rgb(80, 80, 80);
  font-size: 14px;
  fieldset {
    border: none;
  }
`;
