import { Grid } from '@mui/material';
import { RecommendationDashboardType } from 'types/recommendation/RecommendationDashboard';
import { ResumeValues } from '../ResumeValues';
import { Card } from '../Card';

type Props = {
  isLoading: boolean;
  data: RecommendationDashboardType | null;
};

export const CardRecommendationsResume = ({ isLoading, data }: Props) => {
  return (
    <>
      <Card loading={isLoading} title="Recommendations">
        <Grid item xs={12}>
          <ResumeValues
            valueTotal={data?.total || 0}
            totalOpen={data?.totalOpen || 0}
            totalArchived={data?.totalArchived || 0}
            totalHidden={data?.totalHidden || 0}
          />
        </Grid>
      </Card>
    </>
  );
};
