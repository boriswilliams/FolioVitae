import { WelcomeSchema } from '../schemas/welcome';

import { createDataContext } from './data';

export const {
  DataProvider: WelcomeProvider,
  useData: useWelcome
} = createDataContext('welcome', WelcomeSchema);
