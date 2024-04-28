import { object, string } from 'zod';

const SchemaKnowledgeADd = object({
  name: string({ required_error: 'Campo obrigatório' }).refine(
    (val) => {
      return val.length;
    },
    { message: 'Campo obrigatório' }
  ),
  description: string().optional(),
  level: string({ required_error: 'Campo obrigatório' }).refine(
    (val: string) => {
      const valNumber = parseInt(val);
      if (valNumber < 1 || valNumber > 10) {
        return false;
      }

      if (!val.length) return false;

      return true;
    },
    { message: 'O valor deve estar entre 1 e 10' }
  )
});

export default SchemaKnowledgeADd;
