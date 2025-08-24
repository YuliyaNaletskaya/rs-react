import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Must start with uppercase'),
    age: z.coerce.number().min(0, 'Age must be positive'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain uppercase')
      .regex(/[a-z]/, 'Must contain lowercase')
      .regex(/\d/, 'Must contain number')
      .regex(/[\W_]/, 'Must contain special character'),
    confirmPassword: z.string(),
    gender: z.string().refine((val) => val === 'male' || val === 'female', {
      message: 'Gender is required',
    }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept T&C',
    }),
    pictureBase64: z.string().optional().default(''),
    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormOutput = z.infer<typeof formSchema>;
export type FormInput = z.input<typeof formSchema>;
