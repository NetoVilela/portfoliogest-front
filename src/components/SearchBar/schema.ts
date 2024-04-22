import { number, object, string } from 'zod';

const SchemaSearchBar = object({
  name: string().optional(),
  status: number().optional(),
  text: string().optional(),
  hidden: number().optional(),
  archived: number().optional(),
  category: number().optional()
});

export default SchemaSearchBar;
