import { MenuItem, OutlinedInput, SelectChangeEvent } from "@mui/material";
import { Error, InputContainer, Label, SelectStyled } from "./style";
import { ReactNode } from "react";

interface Props {
  label: string;
  error?: string;
  name: string;
  value: string | boolean;
  values: { value: string; label: string }[];
  onChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
}

export const SelectInput = ({ label, error, name, value, values, onChange }: Props) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <SelectStyled name={name} value={value} onChange={onChange} displayEmpty>
        <MenuItem value="" disabled>
          --- Selecione ---
        </MenuItem>
        {values.map((val, key) => (
          <MenuItem key={key} value={val.value}>
            {val.label}
          </MenuItem>
        ))}
      </SelectStyled>
      <Error>{error}</Error>
    </InputContainer>
  );
};
