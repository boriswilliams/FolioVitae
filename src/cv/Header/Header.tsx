import { useProfile } from '../../context/profile';

import './header.css';

function toHref(website: string) {
  return /^[a-z]+:\/\//i.test(website) ? website : `https://${website}`;
}

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
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {website && <a href={toHref(website)}>{website}</a>}
        </address>
      )}
    </header>
  );
}
