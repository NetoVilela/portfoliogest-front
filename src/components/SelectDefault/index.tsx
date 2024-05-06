import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FieldValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

type IOption = {
  id: number | string;
  name: string;
};

type Props = {
  label: string;
  name: string;
  options: IOption[];
  error: boolean;
  helperText: string;
  required: boolean;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
};

export const SelectDefault = ({ label, name, required, options, error, helperText, setValue, trigger }: Props) => {
  return (
    <>
      <InputLabel htmlFor={name} required={required}>
        {label}
      </InputLabel>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          name={name}
          defaultValue={'0'}
          onChange={(e) => {
            setValue(name, e.target.value);
            trigger(name);
          }}
          error={error}
        >
          <MenuItem value={'0'}>
            <em>Escolha uma opção</em>
          </MenuItem>
          {options.map((courseType, index) => {
            return (
              <MenuItem key={index} value={courseType.id}>
                {courseType.name}
              </MenuItem>
            );
          })}
        </Select>
        {error && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {' '}
            {helperText}{' '}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};
