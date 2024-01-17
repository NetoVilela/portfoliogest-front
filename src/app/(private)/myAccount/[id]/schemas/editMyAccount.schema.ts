import { z } from 'zod';

const editMyAccountSChema = z.object({
  name: z.string().min(4, { message: 'Mínimo de 4 dígitos' }),
  phone: z.string(),
  email: z.string().email('Email inválido'),
  password: z.string().min(4, { message: 'Mínimo de 4 dígitos' }),
  repeatPassword: z.string().min(4, { message: 'Mínimo de 4 dígitos' }),
}).refine(data => data.password === data.repeatPassword, {
  message: 'As senhas não correspondem',
  path: ['repeatPassword'],
});

export default editMyAccountSChema;
