import { RecommendationDashboardType } from 'types/recommendation/RecommendationDashboard';
import { Card } from '../Card';
import { TableByCategories } from '../TableByCategories';
// import { ListCategories } from '../ListCategories';

type Props = {
  isLoading: boolean;
  data: RecommendationDashboardType | null;
};
export const CardRecommendationsByCategory = ({ isLoading, data }: Props) => {
  return (
    <Card title="Recommendations by category" loading={isLoading}>
      {/* <ListCategories data={data} /> */}
      <TableByCategories data={data} />
    </Card>
  );
};
