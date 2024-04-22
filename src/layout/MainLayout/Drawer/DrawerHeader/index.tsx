// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled';

import Logo from 'components/logo';
import { HEADER_HEIGHT } from 'config';
import useConfig from 'hooks/useConfig';

// types
import { MenuOrientation } from 'types/config';

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        marginTop: downLG ? 0 : 1,
        minHeight: isHorizontal ? 'unset' : HEADER_HEIGHT
        // width: isHorizontal ? { xs: '100%' } : 'inherit',
        // paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        // paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '8px',
        // paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0,
      }}
    >
      {downLG && <Logo isIcon={!open} sx={{ width: open ? 'auto' : 52, height: 'auto', marginLeft: 5.5 }} />}
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
