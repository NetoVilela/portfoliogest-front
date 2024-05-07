/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import api from 'services/api';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import SchemaProfessionalExperienceForm from './schema';
import { SelectDefault } from 'components/SelectDefault';
import { a_months } from 'utils/datas_mock/months/months';

type Props = {
    handleCallBack: () => void;
    id?: number;
};

const FormProfessionalExperience = ({ handleCallBack, id }: Props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        trigger
    } = useForm({ resolver: zodResolver(SchemaProfessionalExperienceForm) });

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();

    const postData = async (data: FieldValues) => {
        setLoadingSubmit(true);
        const obj = {
        };

        let success = false;
        let message = '';

        if (id) {
            try {
                const response = await api.put(`/professional_experiences/${id}`, obj);

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
                const response = await api.post('/professional_experiences', obj);

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
            setLoading(true);
        };
        getData();

        const getUser = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/professional_experiences/${id}`);
                if (response.status === 200) {
                    reset({
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
    }, [id, reset]);

    return (
        <form onSubmit={handleSubmit(postData)} style={{ minHeight: '40vh' }}>
            {loading ? (
                <LoadingCircular />
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" fontWeight="bold">
                            {id ? 'Editar experiência profissional' : 'Adicionar experiência profissional'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="jobName" required>Cargo</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="Ex: Analista de sistemas"
                                {...register('jobName')}
                                error={!!errors.jobName?.message}
                                helperText={errors.jobName?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="companyName" required>Empresa</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="Ex: Empresa Tec LTDA"
                                {...register('companyName')}
                                error={!!errors.companyName?.message}
                                helperText={errors.companyName?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Stack spacing={1}>
                            <SelectDefault
                                label="Mês (início)"
                                name="monthStart"
                                options={a_months}
                                error={!!errors.monthStart?.message}
                                helperText={errors.monthStart?.message as string}
                                setValue={setValue}
                                trigger={trigger}

                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="yearStart">Ano (início)</InputLabel>
                            <TextField
                                fullWidth
                                type="number"
                                placeholder="Ex: 2020"
                                {...register('yearStart')}
                                error={!!errors.yearStart?.message}
                                helperText={errors.yearStart?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Stack spacing={1}>
                            <SelectDefault
                                label="Mês (fim)"
                                name="monthEnd"
                                options={a_months}
                                error={!!errors.monthEnd?.message}
                                helperText={errors.monthEnd?.message as string}
                                setValue={setValue}
                                trigger={trigger}

                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="yearEnd">Ano (fim)</InputLabel>
                            <TextField
                                fullWidth
                                type="number"
                                placeholder="Ex: 2022"
                                {...register('yearEnd')}
                                error={!!errors.yearEnd?.message}
                                helperText={errors.yearEnd?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="description">Descrição</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="Ex: Trabalhei na Empresa Tec LTDA durante 2 anos e..."
                                {...register('description')}
                                error={!!errors.description?.message}
                                helperText={errors.description?.message as string}
                                multiline
                                rows={5}
                            />
                        </Stack>
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

export default FormProfessionalExperience;
