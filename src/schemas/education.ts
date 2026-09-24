import { array, strictObject, string } from 'zod';

export const EducationSchema = strictObject({
  schools: array(strictObject({
    name: string(),
    start: string().optional(),
    end: string().optional(),
    text: string().optional(),
    'text-cv': string().optional(),
    'text-portfolio': string().optional()
  })).optional()
});
