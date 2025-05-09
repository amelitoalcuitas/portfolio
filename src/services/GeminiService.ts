/**
 * Service for interacting with the Google Gemini API
 */

// Define message types
export interface ChatMessage {
  role: 'user' | 'model' | 'assistant'
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

Projects:
- Ordering Portal: Admin/customer views using Vue.js, Nuxt.js, TypeScript, Laravel
- Triggerly: Acid reflux tracker mobile app using Flutter and Sqflite
- Zubbies: Job scheduler and employee management system using Flutter, Node.js, Firebase

Contact (PUBLIC BUSINESS CONTACT INFO):
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
- For Facebook: [Amelito Alcuitas](https://www.facebook.com/amelitoalcuitasjr) // You can provide this to the AI, but don't share it unless asked

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
   * Send a message to the Gemini API and get a response
   * @param message The user's message
   * @param history Previous chat history
   * @returns The assistant's response
   */
  async sendMessage(message: string, history: ChatMessage[] = []): Promise<string> {
    try {
      // Format the conversation history for the API
      const formattedHistory = []

      // Always add system prompt as the first message in every request
      // Gemini only supports 'user' and 'model' roles
      formattedHistory.push({
        role: 'model',
        parts: [{ text: this.systemPrompt }]
      })

      // Add conversation history
      history.forEach(msg => {
        // Gemini only supports 'user' and 'model' roles
        formattedHistory.push({
          role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
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
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()

      // Extract the response text
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'SorryWhoopsie! Something went a little wonky. Mind giving it another try?'

      return responseText
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      return 'Whoopsie! Something went a little wonky. Mind giving it another try?'
    }
  }
}

// Create and export a singleton instance
export const geminiService = new GeminiService()
