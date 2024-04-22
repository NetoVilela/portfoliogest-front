import moment from 'moment';

// Input => 2024-03-14T06:19:20.000Z
// Output => 14/03/2024

export const formateDate = (date: string) => {
  const dateMoment = moment(date);

  const dateFormatted = dateMoment.format('DD/MM/YYYY');
  return dateFormatted;
};
