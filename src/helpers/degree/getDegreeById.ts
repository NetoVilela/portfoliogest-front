import { degreesMock } from 'utils/datas_mock/courses/degrees';

export const getDegreeById = (id: number) => {
  return degreesMock.find((d) => d.id === id)?.name || 'Não identificado';
};
