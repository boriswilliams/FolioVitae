import { WorkSchema } from '../schemas/work';

import { createDataContext } from './data';

export const {
  DataProvider: WorkProvider,
  useData: useWork
} = createDataContext('work', WorkSchema);
