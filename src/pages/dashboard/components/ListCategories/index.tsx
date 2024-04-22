import React from 'react';
import { Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
// import LinearScaleIcon from '@mui/icons-material/LinearScale';
import SecurityIcon from '@mui/icons-material/Security';
// import FolderIcon from '@mui/icons-material/Folder';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import FactCheckIcon from '@mui/icons-material/FactCheck';
// import SettingsIcon from '@mui/icons-material/Settings';
import { RecommendationDashboardType } from 'types/recommendation/RecommendationDashboard';

type ItemCustomProps = {
  total: number;
  countOpen: number;
  countArchived: number;
  countHidden: number;
  category: string;
  icon: React.ReactNode;
};
const ItemCustom = ({ total, countOpen, countArchived, countHidden, category, icon }: ItemCustomProps) => {
  const theme = useTheme();

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar variant="rounded" sx={{ color: theme.palette.primary.main, background: theme.palette.secondary.lighter }}>
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography color="text.secondary" fontWeight="bold">
            {category}
          </Typography>
        }
        secondary={<Teste />}
      />
    </ListItem>
  );
};

type Props = {
  data: RecommendationDashboardType | null;
};

export const ListCategories = ({ data }: Props) => {
  return (
    <Grid item xs={12} sx={{ maxHeight: '215px', overflowY: 'scroll' }}>
      <List disablePadding sx={{ '& .MuiListItem-root': { px: 0, py: 1 } }}>
        {data?.totalByCategories.map((total, index) => (
          <ItemCustom
            key={index}
            category={total.categoryName}
            countArchived={total.archivedRecommendationCount}
            countOpen={total.openRecommendationCount}
            countHidden={total.hiddenRecommendationCount}
            total={total.recommendationCount}
            icon={<SecurityIcon />}
          />
        ))}
        {/* <ItemCustom category="Archiving" countArchived={1200} countOpen={5432} total={1202} icon={<FolderIcon />} />
        <ItemCustom category="Continuity" countArchived={1200} countOpen={5432} total={1202} icon={<LinearScaleIcon />} />
        <ItemCustom category="Compliance" countArchived={1200} countOpen={5432} total={1202} icon={<CheckCircleOutlineIcon />} />
        <ItemCustom category="Productivity" countArchived={1200} countOpen={5432} total={1202} icon={<FactCheckIcon />} />
        <ItemCustom category="General" countArchived={1200} countOpen={5432} total={1202} icon={<SettingsIcon />} /> */}
      </List>
    </Grid>
  );
};

const Teste = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={2.9}>
        <Box title="Hidden" value={1} color={theme.palette.warning.main} />
      </Grid>
      <Divider orientation="vertical" flexItem />

      <Grid item xs={2.9}>
        <Box title="Open" value={2} color={theme.palette.success.main} />
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid item xs={2.9}>
        <Box title="Archived" value={2} color={theme.palette.error.darker} />
      </Grid>

      <Divider orientation="vertical" flexItem />
      <Grid item xs={2.9}>
        <Box title="Total" value={5} color={theme.palette.secondary.darker} />
      </Grid>
    </Grid>
  );
};

type BoxType = {
  title: string;
  value: number;
  color: string;
};
const Box = ({ title, value, color }: BoxType) => {
  return (
    <Grid display="flex" flexDirection="column">
      <Typography fontSize="0.8rem" fontWeight="bold" align="center" color={color}>
        {title}
      </Typography>
      <Typography fontSize="0.8rem" fontWeight="bold" align="center">
        {value}
      </Typography>
    </Grid>
  );
};
