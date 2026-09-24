import { array, strictObject, string } from 'zod';

export const ProjectsSchema = strictObject({
  projects: array(strictObject({
    name: string(),
    prose: string()
  })).optional()
});
