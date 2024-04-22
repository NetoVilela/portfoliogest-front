import api from 'services/api';
import { IUserAPI } from 'types/user/UserAPI';

export const getUsers = async () => {
  let a_users: IUserAPI[] = [];
  try {
    const response = await api.get('/users');
    if (response.status === 200) {
      response.data.map((item: IUserAPI) => {
        a_users.push({ ...item });

        return 0;
      });
    }
  } catch (error: any) {
    console.log(error);
  }

  return a_users;
};
