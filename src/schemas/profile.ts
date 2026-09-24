import { type infer as Infer, strictObject, string } from 'zod';

export const ProfileSchema = strictObject({
  name: string()
});

export type Profile = Infer<typeof ProfileSchema>;
