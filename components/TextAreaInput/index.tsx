import { InputContainer, TextArea, Label, Error } from "./style";
import { ChangeEventHandler } from "react";

interface InputProps {
  error?: string;
  label: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
}

export const TextAreaInput = ({ error, label, onChange, name, value }: InputProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <TextArea onChange={onChange} name={name} rows={4} value={value}  />
      <Error>{error}</Error>
    </InputContainer>
  );
};
