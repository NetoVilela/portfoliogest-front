import { Grid, Typography } from '@mui/material';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import MainCard from 'components/MainCard';
import React from 'react';

type Props = {
  loading: boolean;
  title: string;
  iconTitle?: React.ReactNode;
  children: React.ReactNode;
};
export const Card = ({ children, loading, title, iconTitle }: Props) => {
  return (
    <MainCard content={false}>
      <Grid container alignItems="center">
        <Typography fontWeight="bold" variant="h5" p={2} pr={1}>
          {title}
        </Typography>
        {iconTitle && iconTitle}
      </Grid>

      {loading ? (
        <Grid p={2}>
          <LoadingCircular minHeight={'0vh'} hasText />
        </Grid>
      ) : (
        <Grid container p={2}>
          {children}
        </Grid>
      )}
    </MainCard>
  );
};
