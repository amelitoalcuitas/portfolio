/**
 * Service for interacting with the Google Gemini API
 */

// Define message types
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface ChatHistory {
  messages: ChatMessage[]
}

class GeminiService {
  private apiKey: string
  private apiUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
  private systemPrompt: string

  constructor() {
    // Get API key from environment variables
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

    if (!this.apiKey) {
      console.error('Gemini API key is not set. Please add VITE_GEMINI_API_KEY to your .env file.')
    }

    // Default system prompt/instructions for the AI
    this.systemPrompt = `
You are an AI assistant for Amelito's portfolio website. Be friendly, professional, and concise.

About Amelito:
- Full stack developer from Cebu, Philippines
- AI enthusiast with expertise in JavaScript, TypeScript, Vue.js, React, Node.js
- Born April 29, 1996

Skills (scale of 1-10):
- Frontend: HTML/CSS (9), JavaScript/TypeScript (9), Vue.js (9), React (7), Flutter (8)
- Backend: Node.js (8), Express.js (8), Laravel (5), PHP (5)
- Database: MongoDB (8), MySQL (8), PostgreSQL (7), Firebase (8)
- Tools: Git (9), Docker (5), Postman (6), VSCode (9), AI Tools (9)

Experience:
- Full Stack Web Developer at Lanex Corporation (2021-Present)
- Freelance Developer (2019-2020)
- Full Stack Web Developer at Bluefrog Contents and Support Inc. (2017-2018)

Projects:
- Ordering Portal: Admin/customer views using Vue.js, Nuxt.js, TypeScript, Laravel
- Triggerly: Acid reflux tracker mobile app using Flutter and Sqflite
- Zubbies: Job scheduler and employee management system using Flutter, Node.js, Firebase

Contact:
- Phone: +63 999 833 5043
- Email: amelitoalcuitasjr@gmail.com
- LinkedIn: linkedin.com/in/amelitoalcuitas
- Resume: /Amelito Alcuitas (Resume).pdf

Formatting:
- Prioritize markdown formatting over HTML
- Use markdown for emphasis (**bold**, *italic*), lists, and headers
- For links, add a message in the beginning like "here's his -"
- Format emails as: [amelitoalcuitasjr@gmail.com](mailto:amelitoalcuitasjr@gmail.com)
- Format URLs as: [linkedin.com/in/amelitoalcuitas](https://linkedin.com/in/amelitoalcuitas)
- Format phone as: [+63 999 833 5043](tel:+639998335043)
- For resume: [Amelito Alcuitas (Resume).pdf](/Amelito%20Alcuitas%20(Resume).pdf)
- For Facebook: [Amelito Alcuitas](https://www.facebook.com/amelitoalcuitasjr)

Guidelines:
- Don't pretend to be Amelito personally
- Make it clear you're an AI assistant
- Don't make up information not provided
- Don't share sensitive personal information
- Current date: ${new Date().toLocaleDateString()}
- Current time: ${new Date().toLocaleTimeString()}
`
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
   * Send a message to the Gemini API and get a response
   * @param message The user's message
   * @param history Previous chat history
   * @returns The assistant's response
   */
  async sendMessage(message: string, history: ChatMessage[] = []): Promise<string> {
    try {
      // Format the conversation history for the API
      const formattedHistory = []

      // Add system prompt as the first message if not already in history
      const hasSystemPrompt = history.some(msg => msg.role === 'system')

      if (!hasSystemPrompt) {
        // Add system prompt as a system message
        formattedHistory.push({
          role: 'system',
          parts: [{ text: this.systemPrompt }]
        })
      }

      // Add conversation history
      history.forEach(msg => {
        formattedHistory.push({
          role: msg.role === 'system' ? 'model' : msg.role, // Gemini uses 'model' instead of 'system'
          parts: [{ text: msg.content }]
        })
      })

      // Add the current message
      formattedHistory.push({
        role: 'user',
        parts: [{ text: message }]
      })

      // Prepare the request
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: formattedHistory,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()

      // Extract the response text
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I seem to be having trouble processing your request. Please try again later.' // Changed this to be more polite

      return responseText
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      return 'Sorry, I seem to be having trouble processing your request. Please try again later.' // Changed this to be more polite
    }
  }
}

// Create and export a singleton instance
export const geminiService = new GeminiService()
