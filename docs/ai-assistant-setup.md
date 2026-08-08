# AI Assistant Setup Guide

This document explains how to set up and customize the AI assistant in the portfolio website.

## Overview

The portfolio includes an AI chat assistant powered by [OpenRouter's free model router](https://openrouter.ai/openrouter/free), which automatically selects from OpenRouter's available free models per request. The assistant is designed to answer questions about Amelito, his skills, projects, and other information related to the portfolio.

## Prerequisites

1. An OpenRouter account
2. An OpenRouter API key (no payment required to use free-tier models)

## Getting an OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/keys)
2. Sign in (or create an account)
3. Create a new API key
4. Copy the API key

## Configuration

1. Add your OpenRouter API key to the `.env` file:

   ```
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key
   ```

2. The chat interface will automatically use this API key to communicate with OpenRouter's API.

## Customizing the AI Assistant's Behavior

The AI assistant uses a system prompt to guide its responses. This prompt tells the AI how to behave, what information to provide, and what tone to use.

### Default System Prompt

The default system prompt is defined in `src/services/OpenRouterService.ts` and includes instructions for the AI about:

- Information about Amelito
- Communication style
- Portfolio information
- Contact information
- Limitations

### Modifying the System Prompt

To customize how the AI assistant responds, you can modify the system prompt in the `OpenRouterService.ts` file:

1. Open `src/services/OpenRouterService.ts`
2. Locate the `systemPrompt` property in the constructor
3. Edit the prompt to include the information you want the AI to know and how you want it to respond

Example of customizing the system prompt:

```typescript
this.systemPrompt = `
You are Amelito's AI assistant for his portfolio website. Here's how you should respond:

1. About Amelito:
   - Amelito is a full stack developer from Cebu, Philippines
   - He is an AI enthusiast with experience in web development
   - He has expertise in JavaScript, TypeScript, Vue.js, React, Node.js, and other modern web technologies
   - He is passionate about creating clean, efficient, and user-friendly applications
   - [Add more specific information about yourself here]

2. Communication style:
   - Be friendly, professional, and helpful
   - Keep responses concise but informative
   - Use a conversational tone
   - [Customize the tone and style as desired]

3. Portfolio information:
   - [Add specific details about your projects]
   - [Add information about your skills and experience]

4. Contact information:
   - [Specify how visitors should contact you]

5. Limitations:
   - [Define what the AI should not discuss]
`
```

### Switching Models

By default the assistant uses `openrouter/free`, which routes each request to whichever free model is currently available on OpenRouter. To pin a specific free model instead (for more consistent behavior), change the `model` property in `OpenRouterService.ts` to any model ID from the [free models list](https://openrouter.ai/models?max_price=0), e.g. `meta-llama/llama-3.3-70b-instruct:free`.

### Programmatically Updating the System Prompt

The `ChatInterface.vue` component exposes an `updateSystemPrompt` method that can be used to change the system prompt at runtime:

```typescript
// Get a reference to the chat interface component
const chatInterface = ref<InstanceType<typeof ChatInterface> | null>(null)

// Update the system prompt
chatInterface.value?.updateSystemPrompt(newPrompt)
```

This can be useful if you want to provide different AI behaviors in different contexts or allow users to select different AI personalities.

## Testing the AI Assistant

After setting up the OpenRouter API key and customizing the system prompt, you can test the AI assistant by:

1. Running the development server with `npm run dev`
2. Opening the portfolio website
3. Clicking on the chat button
4. Asking the AI assistant questions about Amelito, his skills, projects, etc.

## Troubleshooting

If the AI assistant is not working correctly, check the following:

1. Make sure the OpenRouter API key is correctly set in the `.env` file
2. Check the browser console for any error messages
3. Verify that the system prompt is properly formatted
4. Free models can be rate-limited or occasionally unavailable — if responses fail intermittently, consider pinning a specific free model (see "Switching Models" above) instead of the `openrouter/free` router

## HTML Formatting in Responses

The chat interface supports HTML formatting in AI responses. This allows the AI to provide more interactive and visually appealing responses, such as:

- Clickable links for websites, email addresses, and phone numbers (styled with an accent color and underline)
- Formatted text (bold, italic, etc.)
- Lists and other structured content

The styling for links is already configured in the ChatInterface.vue component, making them stand out with an accent color and underline for better visibility.

### Example HTML Formatting Instructions

Here's an example of how to instruct the AI to format its responses with HTML:

```typescript
this.systemPrompt = `
...

Formatting Instructions:
- When mentioning email addresses, format them as clickable mailto links: <a href="mailto:example@example.com">example@example.com</a>
- When mentioning websites or URLs, format them as clickable links: <a href="https://example.com" target="_blank">example.com</a>
- When mentioning phone numbers, format them as clickable tel links: <a href="tel:+1234567890">+1 (234) 567-890</a>
- Always include target="_blank" for external links to open in a new tab
- Links will automatically appear styled with an accent color and underline for better visibility
- Use <strong> for emphasis and <em> for subtle emphasis
- Use <ul> and <li> for lists
`
```

## Best Practices for System Prompts

When customizing the system prompt, consider the following best practices:

1. Be specific about the information you want the AI to provide
2. Clearly define the boundaries of what the AI should and should not discuss
3. Keep the prompt concise but comprehensive
4. Test the AI with various questions to ensure it responds as expected
5. Update the prompt as needed based on feedback and testing
6. Include formatting instructions to make responses more interactive and user-friendly

## Resources

- [OpenRouter Free Models Router](https://openrouter.ai/openrouter/free)
- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
