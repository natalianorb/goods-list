export function idGenerator(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2);
}
