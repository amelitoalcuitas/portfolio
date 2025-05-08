<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <RouterView />
    <BackToTopButton />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackToTopButton from '@/components/BackToTopButton.vue'
</script>
