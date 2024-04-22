import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
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
import { ISimpleCustomerAPI } from 'types/customer/SimpleCustomerAPI';
import { getCustomers } from 'utils/asyncCalls/getCustomers';
import { TextFieldPassword } from 'components/react-hook-form/InputPassword';
import useAuth from 'hooks/useAuth';

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
    trigger
  } = useForm({ resolver: zodResolver(SchemaUserAdd) });

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<IRoleAPI[]>([]);
  const [customers, setCustomers] = useState<ISimpleCustomerAPI[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const customerId = user?.customerId || '';

  const postData = async (data: FieldValues) => {
    setLoadingSubmit(true);
    const obj = {
      name: data.name,
      email: data.email,
      roleId: data.roleId,
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

      const a_customers = await getCustomers();
      setCustomers(a_customers);
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
              Register user
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
                fullWidth
                id="name"
                placeholder="Customer's name"
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
                placeholder="User's email"
                {...register('email')}
                error={!!errors.email?.message}
                helperText={errors.email?.message as string}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="roleId">Role</InputLabel>
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
                    <em>Select role</em>
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

          {watch('roleId') !== 1 && !customerId ? (
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="customerId">Customer</InputLabel>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    name="customerId"
                    value={watch('customerId') || 0}
                    onChange={(e) => {
                      setValue('customerId', e.target.value);
                      trigger('customerId');
                    }}
                    error={!!errors.customerId?.message}
                  >
                    <MenuItem value={0}>
                      <em>Select customer</em>
                    </MenuItem>
                    {customers.map((customer: IRoleAPI) => {
                      return (
                        <MenuItem value={customer.id} key={customer.id}>
                          {customer.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {!!errors.customerId?.message && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {' '}
                      {errors.customerId?.message as string}{' '}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}></Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextFieldPassword
              register={register}
              name="password"
              label="Password"
              placeholder="Enter a password"
              error={!!errors.password?.message}
              helperText={errors.password?.message as string}
              hasIcon={id ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldPassword
              register={register}
              name="passwordAgain"
              label="Repeat password"
              placeholder="Enter a password"
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
                  Submit
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
