import api from 'services/api';
import { SimpleRecommendationHiddenAPI } from 'types/recommendationHidden/SimpleRecommendationHiddenAPI';

export const getRecommendationsHidden = async () => {
  let a_hiddens: SimpleRecommendationHiddenAPI[] = [];
  try {
    const response = await api.get('/recommendations/hiddens');
    if (response.status === 200) {
      response.data.map((item: SimpleRecommendationHiddenAPI) => {
        a_hiddens.push({ ...item });

        return 0;
      });
    }
  } catch (error: any) {
    console.log(error);
  }

  return a_hiddens;
};
