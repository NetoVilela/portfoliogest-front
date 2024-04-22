type CategoryType = {
  categoryId: number;
  categoryName: string;
  recommendationCount: number;
  openRecommendationCount: number;
  archivedRecommendationCount: number;
  hiddenRecommendationCount: number;
};

export type RecommendationDashboardType = {
  total: number;
  totalOpen: number;
  totalArchived: number;
  totalHidden: number;
  totalByCategories: CategoryType[];
};
