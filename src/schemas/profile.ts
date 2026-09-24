import { strictObject, string } from 'zod';

export const ProfileSchema = strictObject({
  name: string().optional(),
  description: string().optional(),
  email: string().optional(),
  website: string().optional()
});
