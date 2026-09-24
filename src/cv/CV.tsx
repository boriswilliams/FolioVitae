import { useEducation } from '../context/education';
import { useProjects } from '../context/projects';
import { useSkills } from '../context/skills';
import { useTech } from '../context/tech';
import { useWork } from '../context/work';

import { Header } from './Header';
import { Section } from './Section';

import './cv.css';

export function CV() {
  const education = useEducation();
  const projects = useProjects();
  const skills = useSkills();
  const tech = useTech();
  const work = useWork();

  return (
    <div className="cv">
      <main className="page">
        <Header />
        <div className="columns">
          <div className="column">
            <Section title="Education" entries={education?.schools} />
            <Section title="Computing Skills" entries={tech?.technologies} />
          </div>
          <div className="column">
            <Section title="Work History" entries={work?.jobs} />
            <Section title="Projects" entries={projects?.projects} />
            <Section title="Additional Skills" entries={skills?.skills} />
          </div>
        </div>
      </main>
    </div>
  );
}
