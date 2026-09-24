import { EducationSchema } from '../schemas/education';

import { createDataContext } from './data';

export const {
  DataProvider: EducationProvider,
  useData: useEducation
} = createDataContext('education', EducationSchema);
