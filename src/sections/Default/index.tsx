import { Box, Typography, Grid } from '@mui/material';
import { DRAWER_WIDTH } from 'config';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { To, useNavigate } from 'react-router';

type Props = {
  title: string;
  children: React.ReactNode;
  handleClickNew?: () => void;
  redirectUrl?: To;
};

export const DefaultSession = ({ title, children, handleClickNew, redirectUrl }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const profileId = user?.profileId || 0;

  const handleRedirectUrl = () => {
    if (redirectUrl) {
      navigate(redirectUrl, {
        state: {
          from: ''
        }
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="main" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1 }}>
        <Grid
          sx={{
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '0px'
          }}
        >
          <Grid container mb={2} pb={1} justifyContent={'space-between'} borderBottom="1px solid rgba(29, 38, 48, 0.2)">
            <Typography variant="h3">{title}</Typography>

            {(handleClickNew || redirectUrl) &&
              profileId !== 4 && ( // 4->Read-Only Administrator
                <Button variant="contained" onClick={ redirectUrl ? handleRedirectUrl : handleClickNew}>
                  <AddIcon /> Adicionar
                </Button>
              )}
          </Grid>

          {children}
        </Grid>
      </Box>
    </Box>
  );
};
