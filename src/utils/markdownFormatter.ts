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

/**
 * Extract navigation hash link from a message
 * @param message The message to check for navigation hash links
 * @returns The hash link if found, null otherwise
 */
export function extractNavigationHashLink(message: string): string | null {
  // Check for HTML anchor tags with hash links
  const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href=["'](#[a-z-]+)["'][^>]*>.*?<\/a>/i
  const htmlMatch = message.match(htmlLinkRegex)
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1]
  }

  // Check for plain text navigation patterns
  const plainTextRegex = /navigate you to .+?(?:section|page).*?(#[a-z-]+)/i
  const plainTextMatch = message.match(plainTextRegex)
  if (plainTextMatch && plainTextMatch[1]) {
    return plainTextMatch[1]
  }

  // Check for any mention of navigation with hash
  const simpleRegex = /navigate.*?(#[a-z-]+)/i
  const simpleMatch = message.match(simpleRegex)
  if (simpleMatch && simpleMatch[1]) {
    return simpleMatch[1]
  }

  return null
}
