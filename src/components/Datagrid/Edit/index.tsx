import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  onClick: (id: string) => void;
};
export const EditDataGrid = ({ params, onClick }: Props) => {
  return (
    <Tooltip title="Edit" placement="top" onClick={() => onClick(params.row.id)}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};
