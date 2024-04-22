import { Divider, Grid, Typography } from '@mui/material';
import { LegendColor } from '../LegendColor';
import { useTheme } from '@mui/system';

export const Legend = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={12} sm={2.8} display="flex" alignItems="center" ml={1}>
        <LegendColor color={theme.palette.secondary.darker} />
        <Typography ml={1}>Total</Typography>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={12} sm={2.8} display="flex" alignItems="center">
        <LegendColor color={theme.palette.success.main} />
        <Typography ml={1}>Open</Typography>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={12} sm={2.8} display="flex" alignItems="center" ml={1}>
        <LegendColor color={theme.palette.error.darker} />
        <Typography ml={1}>Archived</Typography>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={12} sm={2.8} display="flex" alignItems="center" ml={1}>
        <LegendColor color={theme.palette.secondary.main} />
        <Typography ml={1}>Hidden</Typography>
      </Grid>
    </Grid>
  );
};
