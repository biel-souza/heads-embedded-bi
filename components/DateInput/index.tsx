import React from "react";
import { DateInputContainer } from "./style";

interface DateInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ name, label, value, onChange }) => {
  return (
    <DateInputContainer>
      <label htmlFor={name}>{label}</label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </DateInputContainer>
  );
};

export default DateInput;
