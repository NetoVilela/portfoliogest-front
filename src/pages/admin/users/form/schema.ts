import { number, object, string } from 'zod';

const SchemaUserAdd = object({
  name: string({ required_error: 'Campo obrigatório' }).refine((val) => val.length, { message: 'Campo obrigatório' }),
  email: string({ required_error: 'Campo obrigatório' })
    .email('Email inválido')
    .refine((val) => val.length, { message: 'Campo obrigatório' }),
  roleId: number({ required_error: 'Campo obrigatório' }),
  phone: string().optional(),
  password: string({ required_error: 'Campo obrigatório' }).refine((val) => val.length, { message: 'Campo obrigatório' }),
  passwordAgain: string({ required_error: 'Campo obrigatório' }).refine((val) => val.length, { message: 'Campo obrigatório' })
}).refine((data) => data.password === data.passwordAgain, {
  message: 'As senhas não coincidem.',
  path: ['passwordAgain']
});

export default SchemaUserAdd;
