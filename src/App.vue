<template>
  <div class="min-h-screen bg-ink-900 text-mist-100">
    <RouterView />
    <BackToTopButton />
    <ChatButton />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackToTopButton from '@/components/BackToTopButton.vue'
import ChatButton from '@/components/ChatButton.vue'
</script>
