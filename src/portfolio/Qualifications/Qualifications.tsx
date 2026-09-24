import { useEducation } from '../../context/education';

import './qualifications.css';

export function Qualifications() {
  const schools = useEducation()?.schools?.filter(school => school.qualifications?.length);

  if (!schools?.length)
    return null;

  return (
    <section className='qualifications'>
      <h2 className='reveal'>Qualifications</h2>
      <ol className='reveal'>
        {schools.map(school => (
          <li key={school.name}>
            <h3>{school.name}</h3>
            <ul>
              {school.qualifications?.map((qualification) => <li key={qualification}>{qualification}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
