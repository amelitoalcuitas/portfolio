<template>
  <div>
    <!-- Chat Button -->
    <transition name="fade">
      <button
        v-show="true"
        @click="toggleChat"
        class="cursor-pointer fixed bottom-6 p-3.5 bg-ink-800/60 backdrop-blur-md hover:bg-accent-500 text-mist-100 border border-white/10 hover:border-accent-400 rounded-full shadow-lg shadow-black/40 transition-all duration-300 z-40 focus:outline-none focus:ring-2 focus:ring-accent-500/50"
        :class="isBackToTopVisible ? 'right-20' : 'right-6'"
        aria-label="Chat with AI"
      >
        <!-- Chat icon when closed (pointing right) -->
        <svg
          v-if="!isChatOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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

        <!-- X icon when open -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
    </transition>

    <!-- Chat Interface -->
    <transition name="slide">
      <ChatInterface v-if="isChatOpen" @close="closeChat" ref="chatInterface" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useBackToTopVisibility } from '@/composables/useBackToTopVisibility'
import ChatInterface from '@/components/ChatInterface.vue'

// Get the shared state for BackToTopButton visibility
const { isBackToTopVisible } = useBackToTopVisibility()

// Reference to the chat interface component
const chatInterface = ref<InstanceType<typeof ChatInterface> | null>(null)

// State to control chat visibility
const isChatOpen = ref(false)

// Function to toggle chat
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

// Function to close chat
const closeChat = () => {
  isChatOpen.value = false
}

// Handle ESC key to close chat
const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isChatOpen.value) {
    closeChat()
  }
}

// Add event listener for ESC key
onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
})

// Clean up event listener
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
