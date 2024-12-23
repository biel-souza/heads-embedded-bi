import { OutlinedInputProps } from "@mui/material";
import { Error, Input, InputContainer, Label } from "./style";

interface InputTextProps extends Omit<OutlinedInputProps, "error"> {
  error?: string;
}

export const InputText = ({ error, label, ...props }: InputTextProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input {...props} />
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};
