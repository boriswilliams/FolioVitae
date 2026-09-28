import type { Entry, Table } from './types';

import './section.css';

type SectionProps = {
  title: string;
  content: Entry[] | Table;
};

export function Section({ title, content }: SectionProps) {
  if (!(Array.isArray(content) ? content : content.rows).length)
    return null;

  return (
    <section className="section" data-section={title}>
      <h2>{title}</h2>
      {!Array.isArray(content) ? (
        <table>
          <thead>
            <tr>
              {content.columns.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => <td key={i}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ) : content.map((entry) => (
        <article key={entry.heading} className="entry">
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
