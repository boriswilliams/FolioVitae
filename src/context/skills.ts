import { SkillsSchema } from '../schemas/skills';

import { createDataContext } from './data';

export const {
  DataProvider: SkillsProvider,
  useData: useSkills
} = createDataContext('skills', SkillsSchema);
