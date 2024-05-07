import { boolean, object, string } from 'zod';

const SchemaProfessionalExperienceForm = object({
  jobName: string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  description: string().optional(),
  companyName: string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  monthStart: string().optional(),
  yearStart: string({ required_error: 'Campo obrigatório' }).max(4, { message: 'Forneça um ano válido' }),
  monthEnd: string().optional(),
  yearEnd: string({ required_error: 'Campo obrigatório' }).max(4, { message: 'Forneça um ano válido' }),
  currentJob: boolean()
});

export default SchemaProfessionalExperienceForm;
