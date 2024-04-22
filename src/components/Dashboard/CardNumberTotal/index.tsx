import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

type PropsContent = {
  value: number;
};
export const Content = ({ value }: PropsContent) => {
  return (
    <Grid container border="1px solid black">
      <Grid border="1px solid green" p={3} pt={0}>
        <Typography fontWeight="bold" fontSize={16} color="GrayText">
          Total
        </Typography>
        <Typography fontWeight="400" fontSize={38} color="GrayText">
          {value}
        </Typography>
      </Grid>
      <Grid border="1px solid green" p={3} pt={0}>
        <Typography fontWeight="bold" fontSize={16} color="GrayText">
          Status
        </Typography>
        <Typography>
          <Typography component="span" fontWeight="bold" color="red">
            0
          </Typography>
          Archiveds
        </Typography>
      </Grid>
    </Grid>
  );
};

type Props = {
  value: number;
};
export const CardNumberTotal = ({ value }: Props) => {
  return (
    <>
      <MainCard content={false}>
        <Stack direction="column" alignItems="center" spacing={2} p={2}>
          <Grid container border="1px solid red">
            <Typography fontWeight="bold">Your recommendations</Typography>
          </Grid>
          <Grid container border="1px solid blue">
            <Content value={value} />
          </Grid>
        </Stack>
      </MainCard>
    </>
  );
};
