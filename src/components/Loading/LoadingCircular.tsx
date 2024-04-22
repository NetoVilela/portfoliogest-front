import { CircularProgress, Grid } from '@mui/material';

type Props = {
  minHeight?: string;
  hasText?: boolean;
  text?: string;
};

export const LoadingCircular = ({ text = 'Loading...', hasText = false, minHeight = '40vh' }: Props) => {
  return (
    <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{ minHeight }}>
      <CircularProgress />
      {hasText && <small style={{ marginTop: '10px' }}>{text}</small>}
    </Grid>
  );
};
