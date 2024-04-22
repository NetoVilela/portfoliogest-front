import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { ModalDefault } from 'components/ModalDefault';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import api from 'services/api';
import { SimpleRecommendationHiddenAPI } from 'types/recommendationHidden/SimpleRecommendationHiddenAPI';
import { getRecommendationsHidden } from 'utils/asyncCalls/getRecommendationsHiddens';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  attPage: boolean;
  setAttPage: (val: boolean) => void;
};
export const HideFor = ({ params, attPage, setAttPage }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [hideFor, setHideFor] = useState<number>(0);
  const [hiddens, setHiddens] = useState<SimpleRecommendationHiddenAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const recommendationId = params.row.id;
  const [isHidden] = useState<boolean>(params.row.hidden);

  useEffect(() => {
    const getData = async () => {
      const a_hiddens = await getRecommendationsHidden();
      setHiddens(a_hiddens);
    };
    getData();
  }, []);

  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    setLoading(true);
    const hiddenId = hideFor;

    if (!hiddenId || !recommendationId) {
      enqueueSnackbar('Choose a recommendation and hidden type.', {
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      setHideFor(0);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/recommendations/${recommendationId}/hide-for/${hiddenId}`);

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

  const handleUnhide = async () => {
    setLoading(true);

    if (!recommendationId) {
      enqueueSnackbar('Choose a recommendation.', {
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/recommendations/unhide/${recommendationId}`);

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
      <Tooltip title="Unhide" placement="left">
        {isHidden ? (
          <IconButton onClick={handleUnhide}>
            <RemoveRedEyeIcon color="success" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <VisibilityOffIcon color="inherit" />
          </IconButton>
        )}
      </Tooltip>
      <ModalDefault open={open} handleClose={handleClose}>
        <Grid container justifyContent="center" flexDirection="row">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" mb={2}>
              Please, choose a option
            </Typography>
            <Grid container>
              <Select
                fullWidth
                onChange={(e) => setHideFor(e.target.value as number)}
                value={hideFor}
                size="small"
                sx={{ borderRadius: 0.4 }}
              >
                <MenuItem value={0}>
                  <b>Hide for</b>
                </MenuItem>
                {hiddens.map((hidden: SimpleRecommendationHiddenAPI) => {
                  return (
                    <MenuItem value={hidden.id} key={hidden.id}>
                      {hidden.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid container mt={2}>
              <LoadingButton loading={loading} variant="contained" fullWidth onClick={handleClick} size="small" sx={{ borderRadius: 0.4 }}>
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </ModalDefault>
    </>
  );
};
