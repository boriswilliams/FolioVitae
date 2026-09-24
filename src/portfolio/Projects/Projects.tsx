import { useProjects } from '../../context/projects';

import { Project } from './Project';

import './projects.css';

export function Projects() {
  const projects = useProjects()?.projects?.map(project => ({
    ...project,
    heading: project['title-portfolio'] ?? project['title'] ?? '',
    text: project['text-portfolio'] ?? project['text'] ?? ''
  })).filter(
    project => project.heading !== '' && project.text !== ''
  ) ?? [];

  if (!projects?.length)
    return null;

  return (
    <section className='projects'>
      <h2 className='reveal'>Example projects</h2>
      {projects.map(project => <Project key={project.heading} project={project} />)}
    </section>
  );
}
