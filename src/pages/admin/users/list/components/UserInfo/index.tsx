import { useTheme } from '@mui/material/styles';
import { Avatar, Grid, Typography } from '@mui/material';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
};

export const UserInfo = ({ params }: Props) => {
  const { row } = params;
  const theme = useTheme();
  console.log(row);
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Avatar alt="Remy Sharp" src={row.avatar} />
        </Grid>
        <Grid item xs={9}>
          <Grid container flexDirection="column">
            <Typography fontSize={14}>{row.name}</Typography>
            <Typography variant="body2" color={theme.palette.secondary.main}>
              {row.createdAt}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
