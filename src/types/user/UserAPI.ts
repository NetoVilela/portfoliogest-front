import { IRoleAPI } from 'types/role/RoleAPI';

export type IUserAPI = {
  id: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
  customerId: number;
  customerName: string;
  role: IRoleAPI;
  customer: {
    id: string;
    name: string;
  };
};
