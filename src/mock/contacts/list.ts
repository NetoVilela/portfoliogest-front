import { IContact } from 'types/contact/Contact';

export const contactsMock: IContact[] = [
  {
    id: 5,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    value: 'www.instagram.com.br',
    typeName: 'Instagram',
    description: 'instagramJoao_',
    isLink: true
  },
  {
    id: 6,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    value: '(84) 9 9606-7943',
    typeName: 'Telefone',
    description: '',
    isLink: false
  },
  {
    id: 7,
    createdAt: '01/04/2024 às 14:43:23',
    updatedAt: '01/04/2024 às 14:43:23',
    status: true,
    value: 'www.linkedin.com.br',
    typeName: 'Linkedin',
    description: 'Meu linkedin',
    isLink: true
  }
];
