import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import Profile from './Profile';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';
import { MenuOrientation } from 'types/config';
import { ClientName } from './ClientName';

const HeaderContent = () => {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      <Box sx={{ width: '100%', ml: 1 }} />
      <ClientName />
      <Profile />
    </>
  );
};

export default HeaderContent;
