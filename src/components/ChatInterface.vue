<template>
  <div
    class="chat-interface fixed bottom-28 sm:bottom-24 right-6 w-[90%] sm:w-96 md:w-[450px] h-[450px] max-h-[75vh] max-w-[90vw] bg-ink-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-30 flex flex-col"
    :class="{ 'right-6 left-6 w-auto': isMobileScreen }"
  >
    <!-- Chat Header -->
    <div
      class="chat-header bg-ink-900 p-4 flex justify-between items-center border-b border-white/[0.08]"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-accent-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h3 class="font-medium text-mist-100 text-sm">Chat with my AI Assistant</h3>
      </div>
      <div class="flex items-center space-x-3">
        <!-- Clear Chat History Button -->
        <button
          @click="clearChatHistory"
          class="text-mist-400 hover:text-mist-100 focus:outline-none cursor-pointer"
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
              stroke-width="1.5"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="text-mist-400 hover:text-mist-100 focus:outline-none cursor-pointer"
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
    <div
      ref="messagesContainer"
      class="chat-messages bg-ink-800 flex-1 p-3 overflow-y-auto space-y-3"
    >
      <!-- Welcome Message -->
      <div v-if="chatHistory.messages.length === 0" class="chat-message assistant-message">
        <div class="message-content p-3 bg-ink-700 rounded-xl mr-8 sm:mr-16 md:mr-24">
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
            'assistant-message': message.role === 'assistant',
          }"
        >
          <div
            class="message-content p-3 rounded-xl"
            :class="{
              'bg-accent-500/20 border border-accent-500/30 ml-8 sm:ml-16 md:ml-24': message.role === 'user',
              'bg-ink-700 mr-8 sm:mr-16 md:mr-24': message.role === 'assistant',
            }"
          >
            <p v-if="message.role === 'assistant'" v-html="message.content"></p>
            <p v-else>{{ message.content }}</p>
          </div>
        </div>
      </template>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="chat-message assistant-message">
        <div class="message-content p-3 bg-ink-700 rounded-xl mr-8 sm:mr-16 md:mr-24">
          <div class="flex space-x-2 items-center">
            <div class="w-2 h-2 bg-accent-400 rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-accent-400 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="w-2 h-2 bg-accent-400 rounded-full animate-bounce"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="chat-input bg-ink-900 p-3 border-t border-white/[0.08]">
      <form @submit.prevent="sendMessage" class="flex">
        <input
          v-model="userMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 p-3 rounded-l-xl bg-ink-700 text-mist-100 placeholder-mist-400 focus:outline-none"
          :disabled="isLoading"
        />
        <button
          type="submit"
          class="bg-accent-500 hover:bg-accent-400 text-ink-950 p-3 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-accent-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
import { openRouterService, type ChatMessage, type ChatHistory } from '@/services/OpenRouterService'
import { formatMarkdown, extractNavigationHashLink } from '@/utils/markdownFormatter'

// Define props and emits
defineEmits(['close'])

// Chat state
const userMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const isMobileScreen = ref(window.innerWidth < 640) // Check if screen is smaller than sm breakpoint

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
    // Get response from OpenRouter's free model router
    const response = await openRouterService.sendMessage(sentMessage, chatHistory.messages)

    // Format the response with markdown and add to chat history
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: formatMarkdown(response),
      timestamp: new Date(),
    }
    chatHistory.messages.push(assistantMsg)
  } catch (error) {
    console.error('Error sending message:', error)

    // Add error message to chat history with markdown formatting
    const errorMsg: ChatMessage = {
      role: 'assistant',
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
  openRouterService.setSystemPrompt(newPrompt)
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
    if (latestMessage && latestMessage.role === 'assistant') {
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

// Function to update mobile screen status
const updateMobileScreenStatus = () => {
  isMobileScreen.value = window.innerWidth < 640
}

// Scroll to bottom on mount and set up resize listener
onMounted(() => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }

  // Add resize event listener
  window.addEventListener('resize', updateMobileScreenStatus)

  // Initial check
  updateMobileScreenStatus()
})

// Save chat history and clean up event listeners before unmounting
onBeforeUnmount(() => {
  saveChatHistory()
  window.removeEventListener('resize', updateMobileScreenStatus)
})
</script>

<style>
/* Non-scoped styles for dynamically inserted content via v-html */
.message-content a {
  color: #a78bfa !important;
  text-decoration: underline !important;
  text-decoration-thickness: 1px !important;
  text-underline-offset: 2px !important;
  font-weight: 500 !important;
  transition: all 0.2s !important;
}

.message-content a:hover {
  color: #8b5cf6 !important;
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
  color: #a78bfa;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  font-weight: 500;
  transition: all 0.2s;
}

.chat-message a:hover {
  color: #8b5cf6;
  text-decoration: underline;
  text-decoration-thickness: 2px;
}
</style>
