import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { IconButton, Tooltip } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import api from 'services/api';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  attPage: boolean;
  setAttPage: (val: boolean) => void;
};
export const MarkAsNotRelevant = ({ params, attPage, setAttPage }: Props) => {
  const recommendationId = params.row.id;

  const handleClickSituation = async (situationId: number) => {
    /* situationId: 3 -> Not relevant */

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
  };

  return (
    <Tooltip
      title="Mark As Not Relevant"
      onClick={() => {
        handleClickSituation(3);
      }}
      placement="left"
    >
      <IconButton>
        <NotInterestedIcon color="warning" />
      </IconButton>
    </Tooltip>
  );
};
