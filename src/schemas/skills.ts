import { array, strictObject, string } from 'zod';

export const SkillsSchema = strictObject({
  skills: array(strictObject({
    name: string(),
    prose: string()
  })).optional()
});
