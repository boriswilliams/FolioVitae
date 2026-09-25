# Folio Vitae

A portfolio and printable CV rendered at runtime from YAML files. Build once, then serve it from any static host alongside your own data.

## Data

Put these files next to the built site (in `public/` before building), following the schemas in `src/schemas`. Any file can be left out.

| File | Contents |
| --- | --- |
| `profile.yml` | Name, description, contact details, hero photo, contact form |
| `projects.yml` | Projects for the portfolio and CV |
| `education.yml` | Schools and qualifications |
| `work.yml` | Work history |
| `tech.yml` | Computing skills |
| `skills.yml` | Additional skills |

Media files (images, videos) can sit alongside them and be referenced by relative path, e.g. `media: ./demo.mp4`. See `example/` for a complete set.

## Develop and build

```bash
npm install
npm run dev                          # serves the data in example/
npm run build && npm run preview     # builds with public/ and serves dist/
```

## Deploy to a VPS

On the server:

```bash
apt update && apt install nginx -y
```

Set `server_name your.domain www.your.domain;` in `/etc/nginx/sites-enabled/default`, then run `systemctl reload nginx`.

From your machine:

```bash
scp -r dist/* root@<vps-ip>:/var/www/html/
```

For TLS (recommended), on the server:

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your.domain -d www.your.domain
```

## Contact form

The contact page posts to a form service. Set its endpoint in `profile.yml` to show the page; leave it out to hide it.

```yaml
contact-form: https://formspree.io/f/your-form-id
```

These services work as-is:

- [Formspree](https://formspree.io)
- [Getform](https://getform.io)
- [Basin](https://usebasin.com)

The `email` field is used as the reply-to address, and the hidden `_gotcha` field is a honeypot for spam bots.
