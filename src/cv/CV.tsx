import { useRef } from 'react';

import { useEducation } from '../context/education';
import { useProjects } from '../context/projects';
import { useSkills } from '../context/skills';
import { useTech } from '../context/tech';
import { useWork } from '../context/work';

import { formatRange } from './formatRange';
import { usePackedPages } from './usePackedPages';

import { Header } from './Header';
import { isEntry, Section } from './Section';

import './cv.css';

export function CV() {
  const education = useEducation();
  const projects = useProjects();
  const skills = useSkills();
  const tech = useTech();
  const work = useWork();

  const sections = {
    'Education': education?.schools?.map(
      school => ({
        heading: school.name,
        dates: formatRange(school.start, school.end),
        text: school['text-cv'] ?? school['text']
      })
    ) ?? [],
    'Work History': work?.jobs?.map(
      ({ name, start, end, prose, list }) => ({
        heading: name,
        dates: formatRange(start, end),
        text: prose,
        list
      })
    ) ?? [],
    'Computing Skills': tech?.technologies?.map(
      ({ name, prose }) => ({ heading: name, text: prose })
    ) ?? [],
    'Projects': projects?.projects?.map(
      project => ({
        heading: project['title-cv'] ?? project['title'],
        text: project['text-cv'] ?? project['text']
      })
    ).filter(isEntry) ?? [],
    'Soft Skills': skills?.skills?.map(
      ({ name, prose }) => ({ heading: name, text: prose })
    ) ?? []
  };

  const cvRef = useRef<HTMLDivElement>(null);
  const pages = usePackedPages(cvRef, Object.keys(sections), {
    firstSection: 'Education',
    sectionsOnFirstPage: ['Work History']
  });

  return (
    <div ref={cvRef} className='cv'>
      {pages.map((columns, page) => (
        <main key={page} className='page'>
          {page === 0 && <Header />}
          <div className='columns'>
            {columns.map((titles, column) => (
              <div key={column} className='column'>
                {titles.map(title => (
                  <Section key={title} title={title} entries={sections[title as keyof typeof sections]} />
                ))}
              </div>
            ))}
          </div>
        </main>
      ))}
    </div>
  );
}
