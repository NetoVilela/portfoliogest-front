import moment from 'moment';

export const isDateStringValid = (str: string): boolean => {
  return moment(str, moment.ISO_8601, true).isValid();
};
