import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { ModalDefault } from 'components/ModalDefault';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import api from 'services/api';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Form from 'components/react-hook-form/Form';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchemaFixIt } from './schema';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  attPage: boolean;
  setAttPage: (val: boolean) => void;
};
export const FixItBy = ({ params, attPage, setAttPage }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const recommendationId = params.row.id;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(SchemaFixIt) });

  const handleClose = () => setOpen(false);

  const handleSave = async (data: FieldValues) => {
    setLoading(true);

    console.log(data);
    const { dateFixedIt } = data;

    if (!dateFixedIt || !recommendationId) {
      enqueueSnackbar('Choose a recommendation and date.', {
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/recommendations/${recommendationId}/fix-in-date`, {
        date: dateFixedIt
      });

      if (response.status === 200) {
        enqueueSnackbar('Recommendation updated!', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        setAttPage(!attPage);
      }
    } catch (error: any) {
      enqueueSnackbar('Unexpected error!', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Tooltip title="Fix it by" placement="left">
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <HowToRegIcon color="primary" />
        </IconButton>
      </Tooltip>
      <ModalDefault open={open} handleClose={handleClose}>
        <Grid container justifyContent="center" flexDirection="row">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" mb={2}>
              Please, choose a date
            </Typography>
            <Form submit={handleSave} handleSubmit={handleSubmit}>
              <Grid container>
                <TextField
                  fullWidth
                  type="date"
                  placeholder="Customer's main contact name"
                  {...register('dateFixedIt')}
                  error={!!errors.dateFixedIt?.message}
                  helperText={errors.dateFixedIt?.message as string}
                  size="small"
                  inputProps={{
                    min: new Date().toISOString().split('T')[0]
                  }}
                />
              </Grid>
              <Grid container mt={2}>
                <LoadingButton loading={loading} variant="contained" fullWidth type="submit" size="small" sx={{ borderRadius: 0.4 }}>
                  Save
                </LoadingButton>
              </Grid>
            </Form>
          </Grid>
        </Grid>
      </ModalDefault>
    </>
  );
};
