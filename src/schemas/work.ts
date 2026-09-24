import { array, strictObject, string } from 'zod';

export const WorkSchema = strictObject({
  jobs: array(strictObject({
    name: string(),
    prose: string()
  })).optional()
});
