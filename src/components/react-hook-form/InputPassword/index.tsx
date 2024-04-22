import { IconButton } from '@mui/material';
import { FormHelperText, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  error: boolean;
  helperText: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  label: string;
  placeholder: string;
  hasIcon?: boolean;
};

export const TextFieldPassword = ({ error, helperText, register, name, label, placeholder, hasIcon = true }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack spacing={1}>
      <InputLabel htmlFor="password-login">{label}</InputLabel>
      <OutlinedInput
        fullWidth
        error={error}
        {...register(name)}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          hasIcon && (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" color="secondary">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          )
        }
        placeholder={placeholder}
      />
      {error && (
        <FormHelperText error id="standard-weight-helper-text-password-login">
          {helperText}
        </FormHelperText>
      )}
    </Stack>
  );
};
