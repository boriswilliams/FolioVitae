export function formatRange(start?: string, end?: string) {
  return [start, end].filter(Boolean).join(' - ') || undefined;
}
