import { InputLabel, TextField } from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  register: UseFormRegister<FieldValues>;
  hasError: boolean;
  errorMessage: string;
  placeholder: string;
  name: string;
  required?: boolean;
};

export const InputNumberLevel = ({ label, required = false, register, hasError, errorMessage, name, placeholder }: Props) => {
  return (
    <>
      <InputLabel htmlFor={name} required={required}>
        {label}
      </InputLabel>
      <TextField
        fullWidth
        type="number"
        placeholder={placeholder}
        {...register(name)}
        error={hasError}
        helperText={errorMessage as string}
      />
    </>
  );
};
