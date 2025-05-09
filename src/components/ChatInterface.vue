<template>
  <div
    class="chat-interface fixed bottom-20 right-6 w-96 md:w-[450px] h-[450px] bg-gray-800 rounded-lg shadow-xl overflow-hidden z-30 flex flex-col"
    :class="{ 'right-20': isBackToTopVisible }"
  >
    <!-- Chat Header -->
    <div
      class="chat-header bg-blue-600 p-3 flex justify-between items-center border-b border-gray-700"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h3 class="font-medium text-white">Chat with my AI Assistant</h3>
      </div>
      <div class="flex items-center space-x-2">
        <!-- Clear Chat History Button -->
        <button
          @click="clearChatHistory"
          class="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
          aria-label="Clear chat history"
          title="Clear chat history"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
          aria-label="Close chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Chat Messages -->
    <div ref="messagesContainer" class="chat-messages flex-1 p-3 overflow-y-auto space-y-3">
      <!-- Welcome Message -->
      <div v-if="chatHistory.messages.length === 0" class="chat-message assistant-message">
        <div class="message-content p-3 bg-gray-700 rounded-lg mr-16 md:mr-24">
          <p
            v-html="
              formatMarkdown(
                '👋 **Hi there!** I\'m Amelito\'s AI assistant. How can I help you today? <br> I can help you navigate to different sections of the page. I can also help you find information about Amelito. <br> Just ask and I\'ll do my best to help! ',
              )
            "
          ></p>
        </div>
      </div>

      <!-- Chat Messages -->
      <template v-for="(message, index) in chatHistory.messages" :key="index">
        <div
          class="chat-message"
          :class="{
            'user-message': message.role === 'user',
            'assistant-message': message.role === 'model' || message.role === 'assistant',
          }"
        >
          <div
            class="message-content p-3 rounded-lg"
            :class="{
              'bg-blue-600 ml-16 md:ml-24': message.role === 'user',
              'bg-gray-700 mr-16 md:mr-24':
                message.role === 'model' || message.role === 'assistant',
            }"
          >
            <p
              v-if="message.role === 'model' || message.role === 'assistant'"
              v-html="message.content"
            ></p>
            <p v-else>{{ message.content }}</p>
          </div>
        </div>
      </template>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="chat-message assistant-message">
        <div class="message-content p-3 bg-gray-700 rounded-lg mr-16 md:mr-24">
          <div class="flex space-x-2 items-center">
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="chat-input p-3 bg-gray-700">
      <form @submit.prevent="sendMessage" class="flex">
        <input
          v-model="userMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 p-3 rounded-l-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none"
          :disabled="isLoading"
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading || !userMessage.trim()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { useBackToTopVisibility } from '@/composables/useBackToTopVisibility'
import { geminiService, type ChatMessage, type ChatHistory } from '@/services/GeminiService'
import { formatMarkdown, extractNavigationHashLink } from '@/utils/markdownFormatter'

// Define props and emits
defineEmits(['close'])

// Get the shared state for BackToTopButton visibility
const { isBackToTopVisible } = useBackToTopVisibility()

// Chat state
const userMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// Local storage key for chat history
const CHAT_HISTORY_STORAGE_KEY = 'portfolio_chat_history'

// Load chat history from localStorage or initialize empty
const loadChatHistory = (): ChatHistory => {
  try {
    const savedHistory = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY)
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory)
      // Convert string timestamps back to Date objects
      if (parsed.messages && Array.isArray(parsed.messages)) {
        parsed.messages.forEach((msg: ChatMessage) => {
          if (msg.timestamp) {
            msg.timestamp = new Date(msg.timestamp)
          }
        })
      }
      return parsed
    }
  } catch (error) {
    console.error('Error loading chat history from localStorage:', error)
  }
  return { messages: [] }
}

// Chat history
const chatHistory = reactive<ChatHistory>(loadChatHistory())

// Function to send a message
const sendMessage = async () => {
  // Don't send empty messages
  if (!userMessage.value.trim() || isLoading.value) return

  // Add user message to chat history
  const userMsg: ChatMessage = {
    role: 'user',
    content: userMessage.value,
    timestamp: new Date(),
  }
  chatHistory.messages.push(userMsg)

  // Clear input field
  const sentMessage = userMessage.value
  userMessage.value = ''

  // Set loading state
  isLoading.value = true

  try {
    // Get response from Gemini API
    const response = await geminiService.sendMessage(sentMessage, chatHistory.messages)

    // Format the response with markdown and add to chat history
    const assistantMsg: ChatMessage = {
      role: 'model',
      content: formatMarkdown(response),
      timestamp: new Date(),
    }
    chatHistory.messages.push(assistantMsg)
  } catch (error) {
    console.error('Error sending message:', error)

    // Add error message to chat history with markdown formatting
    const errorMsg: ChatMessage = {
      role: 'model',
      content: formatMarkdown('**Error:** Sorry, I encountered an error. Please try again later.'),
      timestamp: new Date(),
    }
    chatHistory.messages.push(errorMsg)
  } finally {
    // Clear loading state
    isLoading.value = false
  }
}

// Function to update system prompt
const updateSystemPrompt = (newPrompt: string) => {
  geminiService.setSystemPrompt(newPrompt)
}

// Function to clear chat history
const clearChatHistory = () => {
  chatHistory.messages = []
  saveChatHistory()
}

// Function to save chat history to localStorage
const saveChatHistory = () => {
  try {
    localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(chatHistory))
  } catch (error) {
    console.error('Error saving chat history to localStorage:', error)
  }
}

// Function to navigate to a section using hash
const navigateToSection = (hash: string) => {
  try {
    // Remove the # if it exists at the beginning
    const sectionId = hash.startsWith('#') ? hash.substring(1) : hash
    const element = document.getElementById(sectionId)

    if (element) {
      // Scroll to the element
      element.scrollIntoView({ behavior: 'smooth' })

      return true
    } else {
      console.warn(`Section with ID ${sectionId} not found`)
      return false
    }
  } catch (error) {
    console.error('Error navigating to section:', error)
    return false
  }
}

// Scroll to bottom when new messages are added
watch(
  () => chatHistory.messages.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }

    // Check if the latest message is from the assistant and contains a navigation link
    const latestMessage = chatHistory.messages[chatHistory.messages.length - 1]
    if (latestMessage && (latestMessage.role === 'model' || latestMessage.role === 'assistant')) {
      const hashLink = extractNavigationHashLink(latestMessage.content)
      if (hashLink) {
        // Wait a moment before navigating to ensure the UI has updated
        setTimeout(() => {
          navigateToSection(hashLink)
        }, 300)
      }
    }

    // Save chat history whenever messages change
    saveChatHistory()
  },
)

// Expose methods to parent component
defineExpose({
  updateSystemPrompt,
  clearChatHistory,
  navigateToSection,
})

// Scroll to bottom on mount
onMounted(() => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})

// Save chat history before unmounting
onBeforeUnmount(() => {
  saveChatHistory()
})
</script>

<style>
/* Non-scoped styles for dynamically inserted content via v-html */
.message-content a {
  color: #3b82f6 !important; /* Bright blue color for links (Tailwind blue-500) */
  text-decoration: underline !important;
  text-decoration-thickness: 1px !important;
  text-underline-offset: 2px !important;
  font-weight: 500 !important;
  transition: all 0.2s !important;
}

.message-content a:hover {
  color: #2563eb !important; /* Darker blue on hover (Tailwind blue-600) */
  text-decoration: underline !important;
  text-decoration-thickness: 2px !important;
}
</style>

<style scoped>
.chat-interface {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-messages {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.user-message {
  display: flex;
  justify-content: flex-end;
}

.assistant-message {
  display: flex;
  justify-content: flex-start;
}

/* Style links in chat messages (for non-v-html content) */
.chat-message a {
  color: #3b82f6; /* Bright blue color for links (Tailwind blue-500) */
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  font-weight: 500;
  transition: all 0.2s;
}

.chat-message a:hover {
  color: #2563eb; /* Darker blue on hover (Tailwind blue-600) */
  text-decoration: underline;
  text-decoration-thickness: 2px;
}
</style>
