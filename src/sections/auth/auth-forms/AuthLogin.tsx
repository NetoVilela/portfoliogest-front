import { useState, SyntheticEvent } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Button, FormHelperText, Grid, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import useAuth from 'hooks/useAuth';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { Eye, EyeSlash } from 'iconsax-react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string({ required_error: 'Required' }).email('Informe um email válido'),
  password: z.string({ required_error: 'Required' }).min(1, 'Informe uma senha válida')
});

const AuthLogin = ({ forgot }: { forgot?: string }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);
    setErrorMsg('');

    // email:info@phoenixcoded.co
    // senha: 123456

    try {
      await login(data.email, data.password);
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                {...register('email')}
                placeholder="Informe seu email"
                fullWidth
                error={Boolean(errors.email && errors.email)}
              />
              {errors.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email.message as string}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Senha</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(errors.password && errors.password)}
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Informe sua senha"
              />
              {errors.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password.message as string}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              {/* <Link variant="h6" component={RouterLink} to={isLoggedIn && forgot ? forgot : '/forgot-password'} color="text.primary">
                Esqueci minha senha
              </Link> */}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                Entrar
              </Button>
            </AnimateButton>
          </Grid>
          {errorMsg && (
            <Grid container display="flex" justifyContent="center">
              <FormHelperText error>{errorMsg}</FormHelperText>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

export default AuthLogin;
