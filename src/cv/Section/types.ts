import { isRecord } from '../../utils/isRecord';

export type Entry = {
  heading: string;
  dates?: string | undefined;
  text?: string | undefined;
  list?: string[] | undefined;
};

export function isEntry(x: unknown): x is Entry & { text: string } {
  if (!isRecord(x))
    return false;
  
  return typeof x.heading === 'string' && typeof x.text === 'string';
}
