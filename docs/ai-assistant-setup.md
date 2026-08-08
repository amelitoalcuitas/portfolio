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
5. If a message looks broken (literal `**`/`[...]` characters, or a "navigate you there" reply that doesn't actually scroll), see "Navigation Links" below — it's usually the model mis-formatting a link, not a bug in the chat UI
6. Chat messages are cached as already-rendered HTML in `localStorage` (`portfolio_chat_history`) — after changing the system prompt or `formatMarkdown()`, clear the chat history (the ⟲ icon in the chat header) before testing, otherwise you'll keep seeing old cached output

## Markdown Formatting in Responses

The system prompt instructs the AI to **prioritize markdown over raw HTML** (see the `Formatting` block in `OpenRouterService.ts`). The flow is:

1. The model responds with markdown (`**bold**`, `[text](url)`, lists, etc.)
2. `formatMarkdown()` in `src/utils/markdownFormatter.ts` runs the response through `marked` to convert it to HTML, then sanitizes it with `DOMPurify`
3. The result is rendered with `v-html` in `ChatInterface.vue`

Links, bold text, and lists all come from markdown syntax — the AI is explicitly told *not* to write raw `<a>`/`<strong>` tags itself.

### Link Formatting Rules

Every link the AI writes must be `[text](url)` with **no space or line break between `]` and `(`** — markdown only recognizes a link when they're directly adjacent. Some free models occasionally insert a line break there anyway, so `formatMarkdown()` also defensively closes that gap (and unescapes stray `\*`/`\[` backslash-escapes) before parsing, as a safety net on top of the prompt instruction.

```typescript
Formatting:
- Prioritize markdown formatting over HTML
- Use markdown for emphasis (**bold**, *italic*), lists, and headers
- Format emails as: [amelitoalcuitasjr@gmail.com](mailto:amelitoalcuitasjr@gmail.com)
- Format phone as: [+63 999 833 5043](tel:+639998335043)
- Every markdown link must be written as [text](url) with no space or line break between ] and (
```

### Navigation Links

The system prompt gives the AI a list of section hash anchors (`#home`, `#about`, `#contact`, etc.) and tells it to offer navigation using a markdown link with that **bare hash anchor** as the URL, e.g. `[Contact](#contact)`.

**Watch out for:** weaker free models occasionally get this wrong and write an absolute path instead — `[Contact](/contact)` — or fall back to raw HTML like `<a href="/contact">#contact</a>`, despite being told not to. Both are broken: the leading `/` makes it a page navigation instead of an in-page scroll, and `extractNavigationHashLink()` (in `markdownFormatter.ts`) specifically looks for an `href="#..."` pattern to trigger the auto-scroll, so a `/contact` link is silently ignored — no error, it just quietly doesn't navigate.

If you notice this happening, the fix is to make the `Navigation` block in the system prompt (`OpenRouterService.ts`) even more explicit/repetitive about the `#section`-only rule, or to pin a stronger model instead of the `openrouter/free` router (see "Switching Models" above) — smaller free models are more prone to this kind of instruction-following slip.

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
