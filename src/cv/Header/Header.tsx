import { useProfile } from '../../context/profile';
import { toHref } from '../../utils/href';

import './header.css';

export function Header() {
  const profile = useProfile();

  if (!profile)
    return null;

  const { name, description, email, website } = profile;

  return (
    <header className="header">
      {name && <h1>{name}</h1>}
      {description && <p className="description">{description}</p>}
      {(email || website) && (
        <address className="contact">
          {website && <a href={toHref(website)}>{website}</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
        </address>
      )}
    </header>
  );
}
