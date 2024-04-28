import { Grid, InputLabel, Stack, TextField, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';

type Props = {
  label: string;
  register: UseFormRegister<FieldValues>;
  hasError: boolean;
  errorMessage: string;
  placeholder: string;
  name: string;
  required?: boolean;
  watch: UseFormWatch<FieldValues>;
};

export const InputNumberLevel = ({ label, required = false, register, hasError, errorMessage, name, placeholder, watch }: Props) => {
  return (
    <>
      <Grid display="flex" justifyContent="space-between" alignItems="center">
        <Stack spacing={1}>
          <Grid display="flex">
            <InputLabel htmlFor={name} required={required}>
              {label}
            </InputLabel>
            <Tooltip title={'Informe um valor de 1 a 10 informando o seu nível de conhecimento'}>
              <HelpIcon sx={{ fontSize: 20, marginLeft: 2 }} />
            </Tooltip>
          </Grid>
          <TextField
            fullWidth
            type="number"
            placeholder={placeholder}
            {...register(name)}
            error={hasError}
            helperText={errorMessage as string}
          />
        </Stack>
      </Grid>
    </>
  );
};
