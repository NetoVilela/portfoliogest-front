import { object, string } from 'zod';

const SchemaKnowledgeADd = object({
  title: string({ required_error: 'Campo obrigatório' }).refine(
    (val) => {
      return val.length;
    },
    { message: 'Campo obrigatório' }
  ),
  description: string().optional(),
  situation: string({ required_error: 'Campo obrigatório' }).refine((val) => val !== '0', { message: 'Campo obrigatório' }),
  link: string().optional()
});

export default SchemaKnowledgeADd;
