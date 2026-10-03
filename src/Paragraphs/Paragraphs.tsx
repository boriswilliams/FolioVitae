export function Paragraphs({ text }: { text: string; }) {
  return text.trim().split(/\n\s*\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}
