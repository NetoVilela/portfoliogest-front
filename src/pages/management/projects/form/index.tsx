/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import api from 'services/api';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import SchemaContactAdd from './schema';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from 'components/VisuallyHiddenInput';
import { a_project_situations } from 'utils/datas_mock/projects/project_situations';

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
        trigger
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
                const response = await api.put(`/projects/${id}`, obj);

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
                const response = await api.post('/projects', obj);

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
                            {id ? 'Editar projeto' : 'Adicionar projeto'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="title" required>Título</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="Ex: Lista de tarefas"
                                {...register('title')}
                                error={!!errors.title?.message}
                                helperText={errors.title?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="situation" required>Situação</InputLabel>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    name="situation"
                                    defaultValue={'0'}
                                    onChange={(e) => {
                                        setValue('situation', e.target.value);
                                        setValue('value', '');
                                        trigger('situation');
                                    }}
                                    error={!!errors.situation?.message}
                                >
                                    <MenuItem value={'0'}>
                                        <em>Tipo de contato</em>
                                    </MenuItem>
                                        {a_project_situations.map((projectType, index) => {
                                        return <MenuItem key={index} value={projectType.id}>{projectType.name}</MenuItem>;
                                    })}
                                </Select>
                                {!!errors.situation?.message && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {' '}
                                        {errors.situation?.message as string}{' '}
                                    </FormHelperText>
                                )}
                            </FormControl>
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

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="link">Link</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="Ex: https://www.minhalistadetarefas.com"
                                {...register('link')}
                                error={!!errors.link?.message}
                                helperText={errors.link?.message as string}
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
