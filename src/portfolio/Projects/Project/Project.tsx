import { toHref } from '../../../utils/href';

import { Media } from './Media';
import { Paragraphs } from './Paragraphs';

import './project.css';

type Project = {
  heading: string;
  text: string;
  media?: string | undefined;
  link?: string | undefined;
  technologies?: string[] | undefined;
}

export function Project({ project }: { project: Project}) {
  return (
    <article className='project reveal'>
      {project.media && (
        <div className='project-media'>
          <Media src={project.media} alt={project.heading} />
        </div>
      )}
      <div className='project-text'>
        <h3>{project.heading}</h3>
        <Paragraphs text={project.text} />
        {!!project.technologies?.length && (
          <ul className='project-tech' aria-label='Technologies'>
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
        )}
        {project.link && (
          <a className='project-link' href={toHref(project.link)}>View project</a>
        )}
      </div>
    </article>
  );
}
