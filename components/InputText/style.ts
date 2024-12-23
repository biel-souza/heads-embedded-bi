import { OutlinedInput } from "@mui/material";
import styled from "styled-components";

export const Input = styled(OutlinedInput)`
  width: 100%;
  padding: 0;
  border: 1px solid rgb(143, 143, 143);
  border-radius: 5px;
  font-size: 14px;
  height: 40px;
  color: rgb(133, 133, 133);
  &:focus-within {
    outline: none;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  input {
    padding: 10px;
  }
  button {
    margin-right: 5px;
  }
`;

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
