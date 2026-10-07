import { useState, type FormEvent } from 'react';

import { useProfile } from '../context/profile';

import '../theme.css';
import './contact.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const profile = useProfile();
  const [status, setStatus] = useState<Status>('idle');

  const endpoint = profile?.['contact-form'];

  if (!endpoint)
    return null;

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className='theme contact-page'>
      <h2>Get in touch</h2>
      <p className='contact-intro'>I will respond as soon as I can.</p>
      {status === 'sent' ? (
        <div className='contact-card' role='status'>
          <h3>Thanks for your message</h3>
          <p>I'll get back to you soon.</p>
          <button className='button' type='button' onClick={() => setStatus('idle')}>Send another</button>
        </div>
      ) : (
        <form className='contact-card' onSubmit={send}>
          <label>
            Name
            <input name='name' autoComplete='name' required />
          </label>
          <label>
            Email
            <input type='email' name='email' autoComplete='email' required />
          </label>
          <label>
            Message
            <textarea name='message' rows={6} required />
          </label>
          <input className='contact-trap' name='_gotcha' tabIndex={-1} autoComplete='off' />
          {status === 'error' && (
            <p className='contact-error' role='alert'>
              Your message couldn't be sent.
              {profile?.email && <> You can email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
            </p>
          )}
          <button className='button' type='submit' disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </main>
  );
}
