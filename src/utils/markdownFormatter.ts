import { marked } from 'marked'
import DOMPurify from 'dompurify'

/**
 * Format a string with markdown syntax to HTML
 * @param text The text to format with markdown
 * @returns Sanitized HTML string with markdown formatting applied
 */
export function formatMarkdown(text: string): string {
  if (!text) return ''

  // Configure marked options if needed
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true,    // Enable GitHub Flavored Markdown
  })

  try {
    // Use marked.parse which returns string | Promise<string>
    // For our simple implementation, we'll use a simpler approach
    const rawHtml = marked(text) as string

    // Sanitize the HTML to prevent XSS attacks
    return DOMPurify.sanitize(rawHtml)
  } catch (error) {
    console.error('Error parsing markdown:', error)
    return DOMPurify.sanitize(text)
  }
}
