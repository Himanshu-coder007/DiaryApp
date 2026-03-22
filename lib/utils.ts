export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}
export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '')
}
