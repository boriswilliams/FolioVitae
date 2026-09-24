import { ProfileSchema } from '../schemas/profile';

import { createDataContext } from './data';

export const {
  DataProvider: ProfileProvider,
  useData: useProfile
} = createDataContext('profile', ProfileSchema);
