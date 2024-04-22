import { Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { Typography } from '@mui/material';
import { BoxValueLabel } from './components/BoxValueLabel';

type Props = {
  valueTotal: number;
  totalOpen: number;
  totalArchived: number;
  totalHidden: number;
};

export const ResumeValues = ({ valueTotal, totalArchived, totalHidden, totalOpen }: Props) => {
  const theme = useTheme();
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={2.9}>
        <BoxValueLabel label="Total">
          <Typography color={theme.palette.secondary.main} fontWeight={400} fontSize={'3.3rem'} align="center">
            {valueTotal}
          </Typography>
        </BoxValueLabel>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={12} sm={2.9}>
        <BoxValueLabel label="Open">
          <Typography color={theme.palette.success.main} fontWeight={400} fontSize={'3.3rem'} align="center">
            {totalOpen}
          </Typography>
        </BoxValueLabel>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={12} sm={2.9}>
        <BoxValueLabel label="Archived">
          <Typography color={theme.palette.error.darker} fontWeight={400} fontSize={'3.3rem'} align="center">
            {totalArchived}
          </Typography>
        </BoxValueLabel>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={12} sm={2.9}>
        <BoxValueLabel label="Hidden">
          <Typography color={theme.palette.warning.main} fontWeight={400} fontSize={'3.3rem'} align="center">
            {totalHidden}
          </Typography>
        </BoxValueLabel>
      </Grid>

      {/* <Grid item xs={12} sm={5.9}>
        <BoxValueLabel label="By situations">
          <Grid mt={1} ml={2}>
            <Typography color={theme.palette.secondary.main} fontWeight={500}>
              <Typography component="span" color={theme.palette.success.main} fontWeight="bold" fontSize="1.2rem">
                {totalOpen}{' '}
              </Typography>
              Open
            </Typography>

            <Typography color={theme.palette.secondary.main} fontWeight={500}>
              <Typography component="span" color={theme.palette.error.darker} fontWeight="bold" fontSize="1.2rem">
                {totalArchived}{' '}
              </Typography>
              Archived
            </Typography>

            <Typography color={theme.palette.secondary.main} fontWeight={500}>
              <Typography component="span" color={theme.palette.warning.main} fontWeight="bold" fontSize="1.2rem">
                {totalHidden}{' '}
              </Typography>
              Hidden
            </Typography>
          </Grid>
        </BoxValueLabel>
      </Grid> */}
    </Grid>
  );
};
