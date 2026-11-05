import { strictObject, string } from 'zod';

export const WelcomeSchema = strictObject({
  heading: string().optional(),
  text: string()
});
