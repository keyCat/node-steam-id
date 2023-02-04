export default function isValidIntString(value: string): boolean {
  return /^\d+$/.test(String(value));
}
