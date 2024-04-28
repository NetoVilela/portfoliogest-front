import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Tooltip } from '@mui/material';

type Props = {
  level: number;
};

export const IconByLevel = ({ level }: Props) => {
  let title = '';
  let color: 'warning' | 'disabled' | 'action' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' = 'error';

  if (level <= 3) {
    title = 'Ainda estou aprendendo';
    color = 'warning';
  }

  if (level >= 4 && level <= 6) {
    title = 'Já possuo experiência';
    color = 'info';
  }

  if (level >= 7) {
    title = 'Sinto-me confiante com essa skill';
    color = 'success';
  }

  return (
    <Tooltip title={title} sx={{ border: '1px solid red' }}>
      {/* <IconButton size="large" sx={{ fontSize: 50 }}> */}
      <LocalLibraryIcon color={color} fontSize="large" />
      {/* </IconButton> */}
    </Tooltip>
  );
};
