import { number, object, string } from 'zod';

const SchemaContactAdd = object({
  value: string().optional(),
  contactType: number({ required_error: 'Campo obrigatório' }).refine((val) => val, { message: 'Campo obrigatório' }),
  link: string().optional()
});

export default SchemaContactAdd;
