export function toHref(website: string) {
  return /^[a-z]+:\/\//i.test(website) ? website : `https://${website}`;
}
