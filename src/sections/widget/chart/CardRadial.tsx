import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MainCard from 'components/MainCard';
import FlagIcon from '@mui/icons-material/Flag';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

type PropsCardRadial = {
  color: string;
  title: string;
  valueTotal: number;
  valueOpen: number;
  valueArchived: number;
};
const CardRadial = ({ color, title, valueTotal, valueArchived, valueOpen }: PropsCardRadial) => {
  return (
    <MainCard content={false}>
      <Typography fontWeight="bold" variant="h5" p={2} pb={0}>
        {title}
      </Typography>
      <Stack direction="column" p={2} pl={4}>
        <Stack direction="row" alignItems={'center'}>
          <Box sx={{ width: 120 }}>
            <Grid
              borderColor={color}
              sx={{ width: '85px', height: '85px', borderWidth: '5px', borderStyle: 'solid', borderRadius: '100%' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography color={color} fontSize={'30px'} fontWeight="700">
                {valueTotal}
              </Typography>
            </Grid>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />

          <Grid display="flex" flexDirection={'column'} ml={3} alignItems="center">
            <Grid display={'flex'} alignItems="center" width="100%">
              <Typography fontWeight={600} color="#2CA87F" fontSize={18}>
                {valueOpen}
              </Typography>
              <Typography fontWeight={700} color="#2CA87F" ml={1}>
                Open
              </Typography>
              <ArrowUpwardIcon sx={{ fontSize: 14, color: '#2CA87F' }} />
            </Grid>
            <Grid display={'flex'} alignItems="center" width="100%">
              <Typography fontWeight={600} color="#c44c4c" fontSize={18}>
                {valueArchived}
              </Typography>
              <Typography fontWeight={700} color="#c44c4c" ml={1}>
                Archived
              </Typography>
              <FlagIcon sx={{ fontSize: 14, color: '#c44c4c' }} />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default CardRadial;
