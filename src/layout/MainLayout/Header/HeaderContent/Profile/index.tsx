import { useRef, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, ButtonBase, CardContent, ClickAwayListener, Grid, Paper, Popper, Stack, Tooltip, Typography } from '@mui/material';

// project-imports
import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';

// assets
import { Logout } from 'iconsax-react';

// types
import { ThemeMode } from 'types/config';

// types
interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

// tab panel wrapper
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      sx={{ p: 1 }}
    >
      {value === index && children}
    </Box>
  );
}

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'primary.200' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar alt={user?.name} src={user?.avatar} sx={{ color: '#fff' }} />
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250
                },
                borderRadius: 1.5
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt={user?.name} src={user?.avatar} />
                          <Stack>
                            <Typography variant="subtitle1">{user?.name}</Typography>
                            <Typography variant="body2" color="secondary">
                              {user?.profileName}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" color="error" sx={{ p: 1 }} onClick={handleLogout}>
                            <Logout variant="Bulk" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <TabPanel value={0} index={0} dir={theme.direction}>
                    <ProfileTab handleLogout={handleLogout} />
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default ProfilePage;
