// import api from 'services/api';
// import { IPriority } from 'types/priority/Priority';

export const getPriorities = () => {
  let a_priorities: string[] = ['', 'High', 'Medium', 'Low'];
  // try {
  //   const response = await api.get('/customers');
  //   if (response.status === 200) {
  //     response.data.map((item: ISimpleCustomerAPI) => {
  //       a_customers.push({
  //         id: item.customer_id || 0,
  //         name: item.name,
  //         label: item.name
  //       });

  //       return 0;
  //     });
  //   }
  // } catch (error: any) {
  //   console.log(error);
  // }

  return a_priorities;
};
