import { number, object, string } from 'zod';

const SchemaCourseForm = object({
  name: string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  situation: string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
    .refine((val) => val !== '0', { message: 'Campo obrigatório' }),
  institution: string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  institutionAcronum: string().optional(),
  degree: number({ required_error: 'Campo obrigatório' }),
  monthStart: string().optional(),
  yearStart: string({ required_error: 'Campo obrigatório' }).max(4, { message: 'Forneça um ano válido' }),
  monthEnd: string().optional(),
  yearEnd: string({ required_error: 'Campo obrigatório' }).max(4, { message: 'Forneça um ano válido' }),
  description: string().optional()
});

export default SchemaCourseForm;
