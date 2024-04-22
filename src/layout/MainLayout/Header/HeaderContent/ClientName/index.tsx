import { Box, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';

export const ClientName = () => {
  const { user } = useAuth();
  return (
    <Box sx={{ flexShrink: 0, mr: 2 }}>
      {/* <Chip label={user?.customerName || 'No customer'} sx={{ fontWeight: 'bold', color: 'secondary.900' }} variant="outlined" /> */}
      <Typography fontWeight="600" fontSize={14} color="secondary.900">
        {user?.name}
      </Typography>
      <Typography fontWeight={500} fontSize={10}>
        {user?.profileName}
      </Typography>

      <Typography fontWeight={400} fontSize={10}>
        {user?.customerName}
      </Typography>
    </Box>
  );
};
