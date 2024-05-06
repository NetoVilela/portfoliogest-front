import { ICourse } from 'types/course/Course';

export const coursesMock: ICourse[] = [
  {
    id: 1,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    degree: 1,
    institution: 'Universidade Federal do Rio Grande do Norte',
    institutionAcronym: 'UFRN',
    name: 'Ciências e Tecnologia',
    monthStart: 1,
    yearStart: 2020,
    monthEnd: 12,
    yearEnd: 2020,
    situation: 'in_progress',
    description: ''
  },
  {
    id: 2,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    degree: 12,
    institution: 'Instituto Federal de Ciência e Tecnologia do Rio Grande do Norte',
    institutionAcronym: 'IFRN',
    name: 'Informática',
    monthStart: 1,
    yearStart: 2020,
    monthEnd: 12,
    yearEnd: 2020,
    situation: 'concluded',
    description: ''
  }
];
