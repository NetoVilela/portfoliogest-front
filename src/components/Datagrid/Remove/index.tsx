import { Tooltip, IconButton } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import api from 'services/api';
import { FieldValues } from 'react-hook-form';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  callBack: (data: FieldValues) => void;
  urlDelete: string;
};

export const RemoveDataGrid = ({ params, callBack, urlDelete }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!window.confirm('Do you want to delete this record?')) {
      return;
    }

    let message = '';
    let success = false;
    try {
      const response = await api.delete(`${urlDelete}/${params.row.id}`);

      if (response.status === 200) {
        message = 'Deleted successfully!';
        success = true;
      }
    } catch (error: any) {
      message = 'Unexpected error!';
      console.log(error);
    }
    callBack({});
    enqueueSnackbar(message, { variant: success ? 'success' : 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
  };

  return (
    <Tooltip title="Delete" placement="top">
      <IconButton onClick={handleDelete}>
        <DeleteIcon color="error" />
      </IconButton>
    </Tooltip>
  );
};
