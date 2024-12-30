import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Error, Group, InputContainer, Label } from "./style";

interface Props {
  label: string;
  name: string;
  error?: string;
  value: string | boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  values: { label: string; value: string | boolean }[];
}

export const RadioInput = ({ label, name, error, value, values, onChange }: Props) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Group name={name} value={value} onChange={onChange}>
        {values.map((value, key) => (
          <FormControlLabel key={key} value={value.value} control={<Radio />} label={value.label} />
        ))}
      </Group>
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};
