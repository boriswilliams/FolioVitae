import { array, strictObject, string } from 'zod';

export const EducationSchema = strictObject({
  schools: array(strictObject({
    name: string(),
    prose: string()
  })).optional()
});
