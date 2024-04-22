import { object, string } from 'zod';

export const SchemaFixIt = object({
  dateFixedIt: string({ required_error: 'Required' }).refine((val) => val.length, { message: 'Required' })
});
