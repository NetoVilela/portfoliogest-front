import api from 'services/api';
import { ISimpleCustomerAPI } from 'types/customer/SimpleCustomerAPI';

export const getCustomers = async () => {
  let a_customers: ISimpleCustomerAPI[] = [];
  try {
    const response = await api.get('/customers');
    if (response.status === 200) {
      response.data.map((item: ISimpleCustomerAPI) => {
        a_customers.push({
          id: item.customer_id || 0,
          name: item.name,
          label: item.name
        });

        return 0;
      });
    }
  } catch (error: any) {
    console.log(error);
  }

  return a_customers;
};
