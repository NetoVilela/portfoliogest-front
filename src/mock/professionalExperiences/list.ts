import { IProfessionalExperience } from 'types/professionalExperience/professionalExperience';

export const professionalExperiencesMock: IProfessionalExperience[] = [
  {
    id: 1,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    jobName: 'Estagiário de suporte em informática',
    monthStart: 1,
    yearStart: 2020,
    monthEnd: 12,
    yearEnd: 2020,
    companyName: 'Empresa qualquer LTDA',
    currentJob: false,
    description: ''
  },
  {
    id: 2,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    jobName: 'Desenvolvedor Web Júnior I',
    monthStart: 1,
    yearStart: 2021,
    monthEnd: 12,
    yearEnd: 2021,
    companyName: 'Empresa qualquer LTDA',
    currentJob: false,
    description: ''
  },
  {
    id: 3,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    jobName: 'Desenvolvedor Web Júnior III',
    monthStart: 1,
    yearStart: 2022,
    monthEnd: 12,
    yearEnd: 2024,
    companyName: 'Empresa qualquer LTDA',
    currentJob: true,
    description: ''
  }
];
