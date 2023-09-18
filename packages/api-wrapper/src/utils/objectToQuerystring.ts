export default function objectToQuerystring(obj: Record<string, any>): string {
  return (
    '?' +
    Object.keys(obj)
      .map(key => `${key}=${obj[key]}`)
      .join('&')
  );
}
