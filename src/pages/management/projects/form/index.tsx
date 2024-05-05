/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import api from 'services/api';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import SchemaContactAdd from './schema';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from 'components/VisuallyHiddenInput';
import { InputNumberLevel } from 'components/InputNumberLevel';

type Props = {
    handleCallBack: () => void;
    id?: number;
};

const FormKnowledge = ({ handleCallBack, id }: Props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch
    } = useForm({ resolver: zodResolver(SchemaContactAdd) });

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const [avatar, setAvatar] = useState<File | null>(null);

    const postData = async (data: FieldValues) => {
        setLoadingSubmit(true);
        const obj = {
        };

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
            setLoading(true);
        };
        getData();

        const getUser = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/skills/${id}`);
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
                            {id ? 'Editar conhecimento' : 'Adicionar conhecimento'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="name" required>Nome</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="Ex: Typescript"
                                {...register('name')}
                                error={!!errors.name?.message}
                                helperText={errors.name?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputNumberLevel
                                register={register}
                                name="level"
                                placeholder="Ex: Typescript"
                                label="Nível de conhecimento"
                                errorMessage={errors.level?.message as string}
                                hasError={!!errors.level?.message}
                                required={true}
                                watch={watch}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="description">Descrição</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="Ex: Obtive conhecimento em Typescript através de ..."
                                {...register('description')}
                                error={!!errors.description?.message}
                                helperText={errors.description?.message as string}
                                multiline
                                rows={5}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Stack spacing={1}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Escolha uma imagem
                                <VisuallyHiddenInput type="file" onChange={(event) => {
                                    if (event.target.files) {
                                        console.log(event.target.files[0]);
                                        setAvatar(event.target.files[0]);
                                    }
                                }} />
                            </Button>
                            {avatar?.name && <span>{avatar.name}</span>}
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

export default FormKnowledge;
