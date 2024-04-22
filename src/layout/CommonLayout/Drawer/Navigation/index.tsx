// material-ui
import { Box, Typography } from '@mui/material';

// project-imports
import NavGroup from './NavGroup';
// types
import { NavItemType } from 'types/menu';

// ==============================|| DRAWER - NAVIGATION ||============================== //

const Navigation = ({ searchValue }: { searchValue?: string }) => {
  let filteredMenuItems: NavItemType[] = [];

  const navGroups = filteredMenuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 1 }}>{navGroups}</Box>;
};

export default Navigation;
