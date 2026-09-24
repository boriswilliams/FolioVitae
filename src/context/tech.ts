import { TechSchema } from '../schemas/tech';

import { createDataContext } from './data';

export const {
  DataProvider: TechProvider,
  useData: useTech
} = createDataContext('tech', TechSchema);
