import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  })
}

export function markdownToSanitizedHtml(markdown: string): string {
  const dirtyHtml = marked(markdown)
  return sanitizeHtml(dirtyHtml)
}

