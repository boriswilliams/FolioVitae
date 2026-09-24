import { ProjectsSchema } from '../schemas/projects';

import { createDataContext } from './data';

export const {
  DataProvider: ProjectsProvider,
  useData: useProjects
} = createDataContext('projects', ProjectsSchema);
