export default function slugify(str: unknown): string {
  return encodeURIComponent(String(str).trim().replace(/\s+/g, '-'))
}
