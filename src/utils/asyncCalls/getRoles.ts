import api from 'services/api';
import { IRoleAPI } from 'types/role/RoleAPI';

export const getRoles = async (customerId?: string) => {
  let a_roles: IRoleAPI[] = [];
  try {
    const response = await api.get('/roles');
    if (response.status === 200) {
      response.data.map((item: IRoleAPI) => {
        if (customerId && item.id === 1) {
          return 0;
        }

        a_roles.push({
          id: item.id,
          name: item.name
        });

        return 0;
      });
    }
  } catch (error: any) {
    console.log(error);
  }

  return a_roles;
};
