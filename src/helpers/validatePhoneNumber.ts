export const validatePhoneNumber = (phone: string) => {
  const onlyNumbers: string = phone.replace(/\D/g, '');

  if (onlyNumbers.length === 11) {
    return phone;
  }
  return '';
};