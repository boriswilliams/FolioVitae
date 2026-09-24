import './section.css';

type Entry = {
  name: string;
  prose: string;
};

type SectionProps = {
  title: string;
  entries: Entry[] | undefined;
};

export function Section({ title, entries }: SectionProps) {
  if (!entries?.length)
    return null;

  return (
    <section className="section">
      <h2>{title}</h2>
      {entries.map((entry) => (
        <article key={entry.name} className="entry keep-together">
          <h3>{entry.name}</h3>
          <p>{entry.prose.trim()}</p>
        </article>
      ))}
    </section>
  );
}
