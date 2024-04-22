import { Switch, Tooltip } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import api from 'services/api';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  urlToggle: string;
};

export const SwitchDataGrid = ({ params, urlToggle }: Props) => {
  const [checked, setChecked] = useState(params.row.status);
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = async () => {
    setChecked(!checked);

    try {
      const response = await api.post(`${urlToggle}/${params.row.id}`);
      if (response.status === 201) {
        enqueueSnackbar('Status updated successfully!', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 1500
        });
      }
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar('Unexpected error!', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 1500
      });
    }
  };

  return (
    <Tooltip title="Toggle status" placement="top">
      <Switch checked={checked} onChange={handleToggle} />
    </Tooltip>
  );
};
