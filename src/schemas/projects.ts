import { array, strictObject, string } from 'zod';

export const ProjectsSchema = strictObject({
  projects: array(strictObject({
    title: string().optional(),
    'title-cv': string().optional(),
    'title-portfolio': string().optional(),
    text: string().optional(),
    'text-cv': string().optional(),
    'text-portfolio': string().optional(),
    media: string().optional(),
    link: string().optional(),
    technologies: array(string()).optional()
  })).optional()
});
