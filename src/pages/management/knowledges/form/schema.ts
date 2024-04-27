import { object, string } from 'zod';

const SchemaContactAdd = object({
  value: string({ required_error: 'Campo obrigatório' }).refine(
    (val) => {
      return val.length;
    },
    { message: 'Campo obrigatório' }
  ),
  contactType: string({ required_error: 'Campo obrigatório' }).refine((val: string) => val !== '', { message: 'Campo obrigatório' }),
  description: string().optional()
});

export default SchemaContactAdd;
