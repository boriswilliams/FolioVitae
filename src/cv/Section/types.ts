import { isRecord } from '../../utils/isRecord';

export type Entry = {
  heading: string;
  text: string;
};

export function isEntry(x: unknown): x is Entry {
  if (!isRecord(x))
    return false;
  
  return typeof x.heading === 'string' && typeof x.text === 'string';
}
