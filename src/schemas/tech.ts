import { array, strictObject, string } from 'zod';

export const TechSchema = strictObject({
  technologies: array(strictObject({
    name: string(),
    prose: string()
  })).optional()
});
