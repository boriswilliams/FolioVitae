import type { Entry } from './types';

import './section.css';

type SectionProps = {
  title: string;
  entries: Entry[];
};

export function Section({ title, entries }: SectionProps) {
  if (!entries?.length)
    return null;

  return (
    <section className="section">
      <h2>{title}</h2>
      {entries.map((entry) => (
        <article key={entry.heading} className="entry keep-together">
          <h3>{entry.heading}</h3>
          {entry.dates && <p className="entry-dates">{entry.dates}</p>}
          {entry.text && <p>{entry.text.trim()}</p>}
          {!!entry.list?.length && (
            <ul>
              {entry.list.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </article>
      ))}
    </section>
  );
}
