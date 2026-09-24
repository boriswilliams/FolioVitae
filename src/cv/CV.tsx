import { useEducation } from '../context/education';
import { useProjects } from '../context/projects';
import { useSkills } from '../context/skills';
import { useTech } from '../context/tech';
import { useWork } from '../context/work';

import { formatRange } from './formatRange';

import { Header } from './Header';
import { isEntry, Section } from './Section';

import './cv.css';

export function CV() {
  const education = useEducation();
  const projects = useProjects();
  const skills = useSkills();
  const tech = useTech();
  const work = useWork();

  return (
    <div className='cv'>
      <main className='page'>
        <Header />
        <div className='columns'>
          <div className='column'>
            <Section
              title='Education'
              entries={education?.schools?.map(
                school => ({
                  heading: school.name,
                  dates: formatRange(school.start, school.end),
                  text: school['text-cv'] ?? school['text']
                })
              ) ?? []}
            />
            <Section
              title='Computing Skills'
              entries={tech?.technologies?.map(
                ({ name, prose }) => ({ heading: name, text: prose })
              ) ?? []}
            />
          </div>
          <div className='column'>
            <Section
              title='Work History'
              entries={work?.jobs?.map(
                ({ name, start, end, prose, list }) => ({
                  heading: name,
                  dates: formatRange(start, end),
                  text: prose,
                  list
                })
              ) ?? []}
            />
            <Section
              title='Projects'
              entries={projects?.projects?.map(
                project => ({
                  heading: project['title-cv'] ?? project['title'],
                  text: project['text-cv'] ?? project['text']
                })
              ).filter(isEntry) ?? []}
            />
            <Section
              title='Additional Skills'
              entries={skills?.skills?.map(
                ({ name, prose }) => ({ heading: name, text: prose })
              ) ?? []}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
