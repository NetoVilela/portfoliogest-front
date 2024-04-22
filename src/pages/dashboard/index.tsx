// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project-imports

import NewOrders from 'sections/widget/chart/NewOrders';
import NewUsers from 'sections/widget/chart/NewUsers';
import Visitors from 'sections/widget/chart/Visitors';

import DropboxStorage from 'sections/widget/statistics/DropboxStorage';
import SwitchBalanace from 'sections/widget/statistics/SwitchBalanace';

import ProjectAnalytics from 'sections/widget/chart/ProjectAnalytics';

import EcommerceIncome from 'sections/widget/chart/EcommerceIncome';
import LanguagesSupport from 'sections/widget/chart/LanguagesSupport';

import ProductOverview from 'sections/widget/chart/ProductOverview';

import PaymentHistory from 'sections/widget/data/PaymentHistory';
import CardRadial from 'sections/widget/chart/CardRadial';
import { useEffect, useState } from 'react';
import api from 'services/api';
import { IRecommendationsDashboard } from 'types/dashboard/RecommendationsDashboard';
// import { CardNumberTotal } from 'components/Dashboard/CardNumberTotal';

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {
  const theme = useTheme();
  const [dataRecommendations, setDataRecommendations] = useState<IRecommendationsDashboard>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/recommendations/dashboard');
        if (response.status === 200) {
          setDataRecommendations(response.data);
          console.log(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardRadial
          title="Recommendations"
          color={theme.palette.success.main}
          valueTotal={dataRecommendations?.total || 0}
          valueArchived={dataRecommendations?.totalArchived || 0}
          valueOpen={dataRecommendations?.totalOpen || 0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardRadial title="IOC Alerts" color={theme.palette.warning.main} valueTotal={0} valueArchived={0} valueOpen={0} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardRadial title="Failed Logins" color={theme.palette.info.darker} valueTotal={0} valueArchived={0} valueOpen={0} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardRadial title="Policy Changes" color={theme.palette.error.main} valueTotal={0} valueArchived={0} valueOpen={0} />
      </Grid>

      {/* row 1 */}
      <Grid item xs={12} md={4} lg={3}>
        <NewOrders />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <NewUsers />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Visitors />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DropboxStorage />
          </Grid>
          <Grid item xs={12}>
            <SwitchBalanace />
          </Grid>
        </Grid>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <ProjectAnalytics />
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <EcommerceIncome />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <LanguagesSupport />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <ProductOverview />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <PaymentHistory />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            {/* <Stack spacing={3}>
              <CardRadial color={theme.palette.primary.main} />
              <CardRadial color={theme.palette.error.dark} />
            </Stack> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardAnalytics;
