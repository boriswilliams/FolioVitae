import { array, strictObject, string } from 'zod';

export const TechSchema = strictObject({
  technologies: array(strictObject({
    name: string(),
    professional: string().optional(),
    personal: string().optional()
  })).optional()
});
