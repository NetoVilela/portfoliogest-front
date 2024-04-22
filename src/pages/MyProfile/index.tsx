import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Form from 'components/react-hook-form/Form';
import { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import api from 'services/api';
import { Schema } from './schema';
import useAuth from 'hooks/useAuth';

const PASSWORD_HASH = 'b204e98';

const MyProfile = () => {
  const { user } = useAuth();
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
    handleSubmit
  } = useForm({ resolver: zodResolver(Schema) });

  useEffect(() => {
    const getData = async () => {
      console.log(user);
      try {
        const response = await api.get('/auth/profile');
        setValue('phone', '123123');
        if (response.status === 200) {
          const { name, phone, email } = response.data;
          setValue('name', name);
          setValue('email', email);
          setValue('phone', phone);
          setValue('password', PASSWORD_HASH);
          setValue('passwordAgain', PASSWORD_HASH);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postData = async (data: FieldValues) => {
    console.log(data);
    const { name, phone, password } = data;
    const obj = {
      name,
      phone,
      status: true,
      ...(password !== PASSWORD_HASH && { password })
    };

    if (!user?.id) {
      console.log('Usuário não identificado!!!');
      return;
    }

    try {
      const response = await api.put(`/users/${user?.id}`, obj);

      if (response.status === 200) {
        console.log('sucesso');
        // alert('Sucesso');
      }
    } catch (error: any) {
      console.log('err');
      console.log(error);
    }

    console.log(obj);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainCard content={true}>
          <Grid>
            <Form handleSubmit={handleSubmit} submit={postData}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3.5}>
                  <TextField
                    value={watch('name') || ''}
                    {...register('name')}
                    fullWidth
                    label="Nome"
                    size="small"
                    error={!!errors.name?.message}
                    helperText={errors.name?.message as string}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3.5}>
                  <TextField
                    value={watch('email') || ''}
                    {...register('email')}
                    fullWidth
                    label="Email"
                    type="email"
                    disabled
                    size="small"
                    error={!!errors.email?.message}
                    helperText={errors.email?.message as string}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3.5}>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, name } }) => (
                      <PatternFormat
                        value={watch('phone') || ''}
                        label="Telefone"
                        format="(##) # ####-####"
                        name={name}
                        onChange={onChange}
                        customInput={TextField}
                        fullWidth
                        type="text"
                        error={!!errors.phone?.message}
                        helperText={errors.phone?.message as string}
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <TextField
                    {...register('password')}
                    fullWidth
                    label="Senha"
                    type="password"
                    size="small"
                    error={!!errors.password?.message}
                    helperText={errors.password?.message as string}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <TextField
                    {...register('passwordAgain')}
                    fullWidth
                    label="Repita a senha"
                    type="password"
                    size="small"
                    error={!!errors.passwordAgain?.message}
                    helperText={errors.passwordAgain?.message as string}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent={'flex-end'}>
                  <Button type="submit" color="success" variant="contained">
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default MyProfile;
