import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { IconButton, Tooltip } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import useAuth from 'hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import api from 'services/api';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  attPage: boolean;
  setAttPage: (val: boolean) => void;
};
export const TakeOwnerShip = ({ params, attPage, setAttPage }: Props) => {
  const { user } = useAuth();
  const recommendationId = params.row.id;

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

  return (
    <Tooltip title="Take Owner Ship" onClick={handleTakeOwnerShip} placement="left">
      <IconButton>
        <AssignmentIndIcon color="success" />
      </IconButton>
    </Tooltip>
  );
};
