import { array, strictObject, string } from 'zod';

export const WorkSchema = strictObject({
  jobs: array(strictObject({
    name: string(),
    start: string().optional(),
    end: string().optional(),
    prose: string().optional(),
    list: array(string()).optional()
  })).optional()
});
