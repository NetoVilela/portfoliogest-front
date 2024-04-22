import { IconButton, Tooltip, Typography } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
};

export const IconCategory = ({ params }: Props) => {
  const categoryId = params.row.recommendationsCategoryId;

  switch (categoryId) {
    case 1:
      return (
        <Tooltip title="Security" placement="right">
          <IconButton>
            <HttpsIcon color="success" />
          </IconButton>
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip title="Archiving" placement="right">
          <IconButton color="error">
            <InventoryIcon />
          </IconButton>
        </Tooltip>
      );
    case 3:
      return (
        <Tooltip title="Continuity" placement="right">
          <IconButton>
            <LinearScaleIcon color="primary" />
          </IconButton>
        </Tooltip>
      );
    case 4:
      return (
        <Tooltip title="Compliance" color="warning" placement="right">
          <IconButton>
            <VerifiedUserIcon />
          </IconButton>
        </Tooltip>
      );

    case 5:
      return (
        <Tooltip title="Productivity" color="inherit" placement="right">
          <IconButton>
            <WorkHistoryIcon />
          </IconButton>
        </Tooltip>
      );
    default:
      return <Typography>No icon</Typography>;
  }
};
