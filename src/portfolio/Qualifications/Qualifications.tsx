import { useEducation } from '../../context/education';

import './qualifications.css';

export function Qualifications() {
  const qualifications = useEducation()?.schools?.flatMap(school => school.qualifications ?? []);

  if (!qualifications?.length)
    return null;

  return (
    <section className='qualifications'>
      <h2>Qualifications</h2>
      <ul>
        {qualifications.map((qualification) => <li key={qualification}>{qualification}</li>)}
      </ul>
    </section>
  );
}
