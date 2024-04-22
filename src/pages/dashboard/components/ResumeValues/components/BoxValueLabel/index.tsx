import { Grid, Typography } from '@mui/material';

type Props = {
  label: string;
  children: React.ReactNode;
};
export const BoxValueLabel = ({ label, children }: Props) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography align="center" fontWeight={500} fontSize={'1rem'}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};
