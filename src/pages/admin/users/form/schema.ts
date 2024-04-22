import { number, object, string, union } from 'zod';

const SchemaUserAdd = object({
  name: string({ required_error: 'Required' }).refine((val) => val.length, { message: 'Required' }),
  email: string({ required_error: 'Required' })
    .email('Invalid Email')
    .refine((val) => val.length, { message: 'Required' }),
  roleId: number({ required_error: 'Required' }),
  customerId: union([number(), string()]).optional().nullable(),
  password: string({ required_error: 'Required' }).refine((val) => val.length, { message: 'Required' }),
  passwordAgain: string({ required_error: 'Required' }).refine((val) => val.length, { message: 'Required' })
}).refine((data) => data.password === data.passwordAgain, {
  message: 'Passwords do not match.',
  path: ['passwordAgain']
});

export default SchemaUserAdd;
