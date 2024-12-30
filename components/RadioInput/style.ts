import { FormControl, RadioGroup } from "@mui/material";
import styled from "styled-components";

export const InputContainer = styled(FormControl)`
  width: 100%;
  margin-bottom: 15px;
  position: relative;
`;

export const Group = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
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
