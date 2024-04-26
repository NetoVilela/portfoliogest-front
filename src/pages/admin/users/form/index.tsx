import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { FormHelperText, Grid, InputLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import api from 'services/api';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import SchemaUserAdd from './schema';
import { getRoles } from 'utils/asyncCalls/getRoles';
import { IRoleAPI } from 'types/role/RoleAPI';
import { TextFieldPassword } from 'components/react-hook-form/InputPassword';
import InputMask from 'react-input-mask';
import useAuth from 'hooks/useAuth';
import { validatePhoneNumber } from 'helpers/validatePhoneNumber';

const PASSWORD_HASH = 'M1R434PM35UPH4ASH';

type Props = {
  handleCallBack: () => void;
  id?: string;
};

const FormUser = ({ handleCallBack, id }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    trigger,
    control
  } = useForm({ resolver: zodResolver(SchemaUserAdd) });

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<IRoleAPI[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const customerId = user?.customerId || '';

  const postData = async (data: FieldValues) => {
    setLoadingSubmit(true);
    const obj = {
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      phone: validatePhoneNumber(data.phone),
      ...(data.password !== PASSWORD_HASH && { password: data.password }),
      ...(data.customerId && { customerId: data.customerId })
    };
    console.log(obj);

    let success = false;
    let message = '';

    if (id) {
      try {
        const response = await api.put(`/users/${id}`, obj);

        if (response.status === 200) {
          message = 'User updated successfully!';
          success = true;
        }
      } catch (error: any) {
        message = error.message || 'Unexpected error!';
        success = false;
        console.log(error);
      }
    } else {
      try {
        const response = await api.post('/users', obj);

        if (response.status === 201) {
          message = 'User created successfully!';
          success = true;
          reset();
          setValue('customerId', null);
          handleCallBack();
        }
      } catch (error: any) {
        message = error.message || 'Unexpected error!';
        success = false;
        console.log(error.message);
      }
    }

    enqueueSnackbar(message, {
      variant: success ? 'success' : 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      autoHideDuration: 1500
    });

    setLoadingSubmit(false);
  };

  useEffect(() => {
    const getData = async () => {
      const a_roles = await getRoles(customerId);
      setRoles(a_roles);
    };
    getData();

    const getUser = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${id}`);
        if (response.status === 200) {
          reset({
            ...response.data,
            password: PASSWORD_HASH,
            passwordAgain: PASSWORD_HASH
          });
        }
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    if (id) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [customerId, id, reset]);

  return (
    <form onSubmit={handleSubmit(postData)} style={{ minHeight: '40vh' }}>
      {loading ? (
        <LoadingCircular />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" fontWeight="bold">
              {id ? 'Editar Usuário' : 'Registrar usuário'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">Nome</InputLabel>
              <TextField
                fullWidth
                id="name"
                placeholder="Informe o nome"
                {...register('name')}
                error={!!errors.name?.message}
                helperText={errors.name?.message as string}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <TextField
                fullWidth
                placeholder="Informe o email"
                {...register('email')}
                error={!!errors.email?.message}
                helperText={errors.email?.message as string}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="roleId">Perfil</InputLabel>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  name="roleId"
                  value={watch('roleId') || 0}
                  onChange={(e) => {
                    setValue('roleId', e.target.value);
                    if (e.target.value === 1) {
                      setValue('customerId', 0);
                    }
                    trigger('roleId');
                  }}
                  error={!!errors.roleId?.message}
                >
                  <MenuItem value={0}>
                    <em>Escolha o perfil</em>
                  </MenuItem>
                  {roles.map((role: IRoleAPI) => {
                    return (
                      <MenuItem value={role.id} key={role.id}>
                        {role.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {!!errors.roleId?.message && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {' '}
                    {errors.roleId?.message as string}{' '}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Grid>

          <Controller
            name="cnpj"
            control={control}
            render={(props) => (
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone">Telefone</InputLabel>
                  <InputMask
                    mask="(99) 9 9999-9999"
                    value={watch('phone') || ''}
                    onChange={(event): void => {
                      setValue('phone', event.target.value);
                    }}
                    onBlur={(event): void => {
                      setValue('phone', validatePhoneNumber(event.target.value));
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Informe o telefone"
                      error={!!errors.phone?.message}
                      helperText={errors.phone?.message as string}
                    />
                  </InputMask>
                </Stack>
              </Grid>
            )}
          />

          <Grid item xs={12} sm={6}>
            <TextFieldPassword
              register={register}
              name="password"
              label="Senha"
              placeholder="Informe uma senha"
              error={!!errors.password?.message}
              helperText={errors.password?.message as string}
              hasIcon={id ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldPassword
              register={register}
              name="passwordAgain"
              label="Repita a senha"
              placeholder="Repita a senha"
              error={!!errors.passwordAgain?.message}
              helperText={errors.passwordAgain?.message as string}
              hasIcon={id ? false : true}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Grid item xs={12} sm={2}>
              <AnimateButton>
                <LoadingButton
                  loading={loadingSubmit}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ fontWeight: 'bold', width: '100%' }}
                >
                  {id ? 'Salvar' : 'Cadastrar'}
                </LoadingButton>
              </AnimateButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default FormUser;
