import { useEducation } from '../../context/education';

import './qualifications.css';

export function Qualifications() {
  const schools = useEducation()?.schools?.map(school => ({
    name: school.name,
    text: school['text-portfolio'] ?? school.text
  })).filter(school => school.text);

  if (!schools?.length)
    return null;

  return (
    <section className='qualifications'>
      <h2 className='reveal'>Qualifications</h2>
      <ol className='reveal'>
        {schools.map(school => (
          <li key={school.name}>
            <h3>{school.name}</h3>
            <p>{school.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
