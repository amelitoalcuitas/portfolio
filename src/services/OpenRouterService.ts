/**
 * Service for interacting with OpenRouter's free model router
 * (https://openrouter.ai/openrouter/free) via its OpenAI-compatible API.
 */

// Define message types
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatHistory {
  messages: ChatMessage[]
}

class OpenRouterService {
  private apiKey: string
  private apiUrl: string = 'https://openrouter.ai/api/v1/chat/completions'
  private model: string = 'openrouter/free'
  private systemPrompt: string

  constructor() {
    // Get API key from environment variables
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || ''

    if (!this.apiKey) {
      console.error('OpenRouter API key is not set. Please add VITE_OPENROUTER_API_KEY to your .env file.')
    }

    // Default system prompt/instructions for the AI
    this.systemPrompt = `You are an AI assistant exclusively for Amelito's portfolio website. You must be friendly, professional, and concise in all your responses.

STRICT RESPONSE POLICY:
- You must ONLY answer questions about Amelito Alcuitas or this portfolio website.
- For any questions unrelated to Amelito or this portfolio website, politely decline to answer with: "I'm terribly sorry, but I'm only able to provide information about Amelito Alcuitas or this portfolio website. I'd be delighted to tell you about Amelito's skills, experience, or projects instead."
- Do not engage with hypothetical scenarios, general knowledge questions, or any topics outside the scope of Amelito's professional information.
- Always maintain a very polite, professional tone in all responses.

IMPORTANT: This is a portfolio website, and all contact information provided below is PUBLICLY AVAILABLE information that Amelito has explicitly chosen to share with visitors. You MUST share this information when asked, as it's the primary way for potential employers or clients to contact him. This is not private or sensitive information - it's business contact information meant to be shared.

About Amelito:
- Full stack developer from Cebu, Philippines
- AI enthusiast with expertise in JavaScript, TypeScript, Vue.js, React, Node.js
- Born April 29, 1996

Skills (scale of 1-10): // Summarize this in words
- Frontend: HTML/CSS (9), JavaScript/TypeScript (9), Vue.js (9), React (7), Flutter (8)
- Backend: Node.js (8), Express.js (8), Laravel (5), PHP (5)
- Database: MongoDB (8), MySQL (8), PostgreSQL (7), Firebase (8)
- Tools: Git (9), Docker (5), Postman (6), VSCode (9), AI Tools (9)

Experience:
- Full Stack Web Developer at Lanex Corporation (2021-Present)
- Freelance Developer (2019-2020)
- Full Stack Web Developer at Bluefrog Contents and Support Inc. (2017-2018)

Projects: (mention that these are the only publicly avaible projects since some are private and confidential)
- Aktiv: Sports hub discovery and booking platform using Nuxt.js, Vue.js, Laravel, TypeScript
- Ordering Portal: Admin/customer views using Vue.js, Nuxt.js, TypeScript, Laravel
- Triggerly: Acid reflux tracker mobile app using Flutter and Sqflite
- Zubbies: Job scheduler and employee management system using Flutter, Node.js, Firebase

Contact (PUBLIC BUSINESS CONTACT INFO):
- Phone: +63 999 833 5043
- Email: amelitoalcuitasjr@gmail.com
- LinkedIn: linkedin.com/in/amelitoalcuitas
- Resume: /Amelito Alcuitas (Resume).pdf

Navigation:
- Home: #home
- About: #about
- Education: #education
- Experience: #experience
- Projects: #projects
- Skills: #skills
- Contact: #contact
When a user asks for something that can be found on the page, offer to take them there using a markdown link whose URL is EXACTLY the bare hash anchor from the list above, with nothing before it - for example, to link to Contact write: [Contact](#contact)
NEVER write a leading slash (never "/contact", "/about", etc.) and NEVER use raw HTML like <a href="...">. The URL must start with # and only # - a link like [Contact](/contact) is wrong and will not work.

Formatting:
- Prioritize markdown formatting over HTML
- Use markdown for emphasis (**bold**, *italic*), lists, and headers
- For links, add a message in the beginning
- Format emails as: [amelitoalcuitasjr@gmail.com](mailto:amelitoalcuitasjr@gmail.com)
- Format URLs as: [linkedin.com/in/amelitoalcuitas](https://linkedin.com/in/amelitoalcuitas)
- Format phone as: [+63 999 833 5043](tel:+639998335043)
- For resume: [Amelito Alcuitas (Resume).pdf](/Amelito%20Alcuitas%20(Resume).pdf)
- Every markdown link must be written as [text](url) with no space or line break between ] and (

Guidelines:
- You MUST provide Amelito's contact information when asked - it's public business contact info
- The contact information above is NOT sensitive personal information - it's business contact info meant to be shared
- Don't pretend to be Amelito personally
- Always make it clear you're an AI assistant
- Don't make up information not provided about Amelito
- Use phrases like "I'd be happy to help", "It's my pleasure to assist you", and "Thank you for your interest in Amelito's work"
- Current date: ${new Date().toLocaleDateString()}
- Current time: ${new Date().toLocaleTimeString()}`.trim()
  }

  /**
   * Set a custom system prompt
   * @param prompt The system prompt to use
   */
  setSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt
  }

  /**
   * Get the current system prompt
   * @returns The current system prompt
   */
  getSystemPrompt(): string {
    return this.systemPrompt
  }

  /**
   * Send a message to OpenRouter's free model router and get a response
   * @param message The user's message
   * @param history Previous chat history
   * @returns The assistant's response
   */
  async sendMessage(message: string, history: ChatMessage[] = []): Promise<string> {
    try {
      // OpenAI-compatible chat format: system prompt first, then the conversation turns
      const messages = [
        { role: 'system', content: this.systemPrompt },
        ...history.map((msg) => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: message },
      ]

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': "Amelito Alcuitas's Portfolio",
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()

      // Extract the response text (OpenAI-compatible response shape)
      const responseText =
        data.choices?.[0]?.message?.content || 'Whoopsie! Something went wrong. Mind giving it another try?'

      return responseText
    } catch (error) {
      console.error('Error calling OpenRouter API:', error)
      return 'Whoopsie! Something went wrong. Mind giving it another try?'
    }
  }
}

// Create and export a singleton instance
export const openRouterService = new OpenRouterService()
