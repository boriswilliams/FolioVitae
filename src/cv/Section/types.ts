import { isRecord } from '../../utils/isRecord';

export type Entry = {
  heading: string;
  dates?: string;
  text?: string;
  list?: string[];
};

export function isEntry(x: unknown): x is Entry & { text: string } {
  if (!isRecord(x))
    return false;
  
  return typeof x.heading === 'string' && typeof x.text === 'string';
}
