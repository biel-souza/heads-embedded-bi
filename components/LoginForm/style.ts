import { OutlinedInput } from "@mui/material";
import styled from "styled-components";

export const LoginContainer = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 1px 4px 15px rgba(0, 0, 0, 0.17);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 250px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  color: rgb(88, 88, 88);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
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

export const Button = styled.button`
  color: white;
  background-color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  border: 0;
  background-color: #0819c7;
  width: 90%;
  max-width: 200px;
  margin-top: 20px;
`;
