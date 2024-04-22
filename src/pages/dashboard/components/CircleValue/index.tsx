import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

type Props = {
  value: number;
  color: string;
};

export const CircleValue = ({ value, color }: Props) => {
  return (
    <Box sx={{ width: 120, margin: '0 auto' }}>
      <Grid
        borderColor={color}
        sx={{ width: '90px', height: '90px', borderWidth: '5px', borderStyle: 'solid', borderRadius: '100%', margin: '0 auto' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography color={color} fontSize={'30px'} fontWeight="700">
          {value}
        </Typography>
      </Grid>
    </Box>
  );
};
