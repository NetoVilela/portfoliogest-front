/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, FormHelperText, Grid, InputLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import api from 'services/api';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import SchemaContactAdd from './schema';
import { IContactType } from 'types/contact/Type';
import { contactsTypeMock } from 'mock/contactsType/list';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from 'components/VisuallyHiddenInput';



type Props = {
    handleCallBack: () => void;
    id?: string;
};

const FormContact = ({ handleCallBack, id }: Props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(SchemaContactAdd) });

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [contactTypes, setContactTypes] = useState<IContactType[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const [avatar, setAvatar] = useState<File | null>(null);

    const postData = async (data: FieldValues) => {
        setLoadingSubmit(true);
        const obj = {
        };
        console.log(obj);
        console.log(avatar);

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
            setContactTypes(contactsTypeMock);
        };
        getData();

        const getUser = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/contacts/${id}`);
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
                            {id ? 'Editar contato' : 'Adicionar contato'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="value">Valor</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="ex: meuLinkedin123"
                                {...register('value')}
                                error={!!errors.value?.message}
                                helperText={errors.value?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="contactType">Tipo de contato</InputLabel>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select name="contactType" defaultValue={0} onChange={(e) => setValue('type', e.target.value)}>
                                    <MenuItem value={0}>
                                        <em>Tipo de contato</em>
                                    </MenuItem>
                                    {contactTypes.map((contactType, index) => {
                                        return <MenuItem key={index} value={contactType.id}>{contactType.name}</MenuItem>;
                                    })}
                                </Select>
                                {!!errors.contactType?.message && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {' '}
                                        {errors.contactType?.message as string}{' '}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="link">Link</InputLabel>
                            <TextField
                                fullWidth
                                placeholder="ex: htttps://www.linkedin.com/meuLinkedin123"
                                {...register('link')}
                                error={!!errors.link?.message}
                                helperText={errors.link?.message as string}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                        <Stack spacing={1}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
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

export default FormContact;
