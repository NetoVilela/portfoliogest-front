import { object, string } from 'zod';

export const Schema = object({
  name: string({ required_error: 'Campo obrigatório' }).refine(
    (val) => {
      return val.length;
    },
    { message: 'Campo obrigatório' }
  ),
  phone: string({ required_error: 'Campo obrigatório' }).refine(
    (val) => {
      return val.replace(/\D/g, '').length === 11;
    },
    { message: 'Campo obrigatório' }
  ),
  password: string({ required_error: 'Campo obrigatório' }).refine(
    (val) => {
      return val.length;
    },
    { message: 'Campo obrigatório' }
  ),
  passwordAgain: string({ required_error: 'Campo obrigatório' }).refine(
    (val) => {
      return val.length;
    },
    { message: 'Campo obrigatório' }
  )
}).refine(
  (data) => {
    console.log(data);
    return data.password === data.passwordAgain;
  },
  {
    message: 'As senhas não coincidem.',
    path: ['passwordAgain']
  }
);
