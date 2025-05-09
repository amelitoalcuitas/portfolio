<template>
  <div class="chat-view">
    <!-- Mobile Chat Header -->
    <div class="chat-header">
      <button @click="goBack" class="back-button" aria-label="Go back">
        <svg
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <div class="chat-title">Chat with AI Assistant</div>
      <div class="spacer"></div>
    </div>

    <!-- Chat Interface - Using a key to ensure it's a fresh instance -->
    <ChatInterface key="mobile-chat" :isOpen="true" @close="goBack" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChatInterface from '@/components/ChatInterface.vue'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.chat-view {
  height: 100vh;
  width: 100%;
  background-color: #1f2937;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #2d3748;
  border-bottom: 1px solid #4b5563;
  height: 50px;
}

.chat-title {
  font-weight: 600;
  font-size: 1rem;
  color: white;
}

.back-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.spacer {
  width: 24px;
}
</style>
