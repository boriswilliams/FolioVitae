export function isRecord(x: unknown): x is Record<string, unknown> {
  if (typeof x !== 'object')
    return false;

  if (x === null)
    return false;
  
  if (Array.isArray(x))
    return false;
  
  return true;
}
