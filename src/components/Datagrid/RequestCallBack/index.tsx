import { IconButton, Tooltip } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import api from 'services/api';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  attPage: boolean;
  setAttPage: (val: boolean) => void;
};
export const RequestCallBack = ({ params, attPage, setAttPage }: Props) => {
  const recommendationId = params.row.id;

  const handleClickSituation = async (situationId: number) => {
    /* situationId: 4 -> Require Call Back */

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
      title="Request Call Back"
      onClick={() => {
        handleClickSituation(4);
      }}
      placement="left"
    >
      <IconButton>
        <PhoneCallbackIcon color="error" />
      </IconButton>
    </Tooltip>
  );
};
