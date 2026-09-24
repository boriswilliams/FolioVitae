import { array, strictObject, string } from 'zod';

export const EducationSchema = strictObject({
  schools: array(strictObject({
    name: string(),
    start: string().optional(),
    end: string().optional(),
    prose: string(),
    qualifications: array(string()).optional()
  })).optional()
});
