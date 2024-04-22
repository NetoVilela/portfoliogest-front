import api from 'services/api';
import { ICategoryAPI } from 'types/category/CategoryAPI';

export const getCategories = async () => {
  let a_categories: ICategoryAPI[] = [];
  try {
    const response = await api.get('/recommendations/categories');
    if (response.status === 200) {
      response.data.map((item: ICategoryAPI) => {
        a_categories.push(item);

        return 0;
      });
    }
  } catch (error: any) {
    console.log(error);
  }

  return a_categories;
};
