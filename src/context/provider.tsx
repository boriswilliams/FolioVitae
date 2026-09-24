import type { ReactNode } from 'react';

import { EducationProvider } from './education';
import { ProfileProvider } from './profile';
import { ProjectsProvider } from './projects';
import { SkillsProvider } from './skills';
import { TechProvider } from './tech';
import { WorkProvider } from './work';

export function Provider({ children }: { children: ReactNode; }) {
  return (
    <EducationProvider>
      <ProfileProvider>
        <ProjectsProvider>
          <SkillsProvider>
            <TechProvider>
              <WorkProvider>
                {children}
              </WorkProvider>
            </TechProvider>
          </SkillsProvider>
        </ProjectsProvider>
      </ProfileProvider>
    </EducationProvider>
  );
}
