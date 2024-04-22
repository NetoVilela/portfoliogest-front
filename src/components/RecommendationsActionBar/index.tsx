import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Grid } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import api from 'services/api';
import { SimpleRecommendationHiddenAPI } from 'types/recommendationHidden/SimpleRecommendationHiddenAPI';
import { IUser } from 'types/user/User';
import { getRecommendationsHidden } from 'utils/asyncCalls/getRecommendationsHiddens';
import { getUsers } from 'utils/asyncCalls/getUsers';

type Props = {
  recommendationId: number;
  attPage: boolean;
  setAttPage: (val: boolean) => void;
};

export const RecommendationsActionBar = ({ recommendationId, attPage, setAttPage }: Props) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [hiddens, setHiddens] = useState<SimpleRecommendationHiddenAPI[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const [fixedByUserId, setFixedByUserId] = useState<number>(0);
  const [hideFor, setHideFor] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const a_hiddens = await getRecommendationsHidden();
      setHiddens(a_hiddens);

      const a_users = await getUsers();
      setUsers(a_users);
    };
    getData();
  }, []);

  const handleTakeOwnerShip = async () => {
    if (!user?.id || !recommendationId) {
      enqueueSnackbar('Choose a recommendation.', { variant: 'warning', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      return;
    }

    try {
      const response = await api.post(`/recommendations/${recommendationId}/owner/${user?.id}`);

      if (response.status === 200) {
        enqueueSnackbar('Owner updated!', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        setAttPage(!attPage);
      }
    } catch (error: any) {
      enqueueSnackbar('Unexpected error!', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      console.log(error);
    }
  };

  const handleChangeHidden = async (event: SelectChangeEvent<number>) => {
    const hiddenId = event.target.value;

    if (!hiddenId || !recommendationId) {
      enqueueSnackbar('Choose a recommendation and hidden type.', {
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      setHideFor(0);
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

    setFixedByUserId(0);
  };

  const handleChangeFixedBy = async (event: SelectChangeEvent<number>) => {
    const userId = event.target.value;

    if (!userId || !recommendationId) {
      enqueueSnackbar('Choose a recommendation and user.', {
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      setFixedByUserId(0);
      return;
    }

    try {
      const response = await api.post(`/recommendations/${recommendationId}/fix/${userId}`);

      if (response.status === 200) {
        enqueueSnackbar('Recommendation updated!', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        setAttPage(!attPage);
      }
    } catch (error: any) {
      enqueueSnackbar('Unexpected error!', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      console.log(error);
    }

    setFixedByUserId(0);
  };

  const handleClickSituation = async (situationId: number) => {
    /*
      situationId: 
        3 -> Not relevant
        4 -> Require Call Back
    */

    if (!recommendationId) {
      enqueueSnackbar('Choose a recommendation.', {
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      return;
    }

    try {
      const response = await api.post(`/recommendations/${recommendationId}/change-situation/${situationId}`);

      if (response.status === 200) {
        enqueueSnackbar('Recommendation updated!', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        setAttPage(!attPage);
      }
    } catch (error: any) {
      enqueueSnackbar('Unexpected error!', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      console.log(error);
    }

    setFixedByUserId(0);
  };

  return (
    <Grid container alignItems="center" spacing={1} mb={4}>
      <Grid item xs={12} sm={3.2} md={2.2} xl={2}>
        <Button variant="contained" color="success" size="small" fullWidth onClick={handleTakeOwnerShip}>
          <b>Take owner ship</b>
        </Button>
      </Grid>

      <Grid item xs={12} sm={3.2} md={2.2} xl={2}>
        <Button variant="contained" color="success" size="small" fullWidth onClick={() => handleClickSituation(3)}>
          <b>Mark as not relevant</b>
        </Button>
      </Grid>

      <Grid item xs={12} sm={3.2} md={2.2} xl={2}>
        <Button variant="contained" color="success" size="small" fullWidth onClick={() => handleClickSituation(4)}>
          <b>Request call back</b>
        </Button>
      </Grid>

      <Grid item xs={12} sm={3} md={2}>
        <Select fullWidth onChange={handleChangeHidden} value={hideFor} size="small" sx={{ bgcolor: 'success.main', color: '#fff' }}>
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

      <Grid item xs={12} sm={3} md={2}>
        <Select
          fullWidth
          onChange={handleChangeFixedBy}
          defaultValue={fixedByUserId}
          size="small"
          sx={{ bgcolor: 'success.main', color: '#fff' }}
        >
          <MenuItem value={0}>
            <b>Fix it by...</b>
          </MenuItem>
          {users.map((user: IUser) => {
            return (
              <MenuItem value={user.id} key={user.id}>
                {user.name}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    </Grid>
  );
};
