type ICategory = {
  category_id: number;
  category_name: string;
  recommendation_count: number;
};

export type IRecommendationsDashboard = {
  total: number;
  totalOpen: number;
  totalHidden: number;
  totalArchived: number;
  totalByCategories: ICategory[];
};
