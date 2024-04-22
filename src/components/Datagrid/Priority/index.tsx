import { Chip } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { getPriorities } from 'utils/asyncCalls/getPriorities';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
};

export const PriorityDataGrid = ({ params }: Props) => {
  const priorities = getPriorities();
  const priorityId = params.row.recommendationsPriorityId;
  const label = priorities[priorityId];

  let color: 'default' | 'primary' | 'error' | 'warning' | 'info' | 'secondary' | 'success' = 'default';
  switch (priorityId) {
    case 1:
      color = 'error';
      break;
    case 2:
      color = 'warning';
      break;
    case 3:
      color = 'primary';
      break;
    default:
      color = 'default';
      break;
  }

  return <Chip label={label} color={color} size="small" variant="light" />;
};
