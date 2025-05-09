<template>
  <div class="w-full py-6 relative z-10 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-center">
        <!-- Decorative dots pattern -->
        <div class="flex space-x-2">
          <div
            v-for="i in 5"
            :key="i"
            class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"
            :style="{ animationDelay: `${i * 0.1}s` }"
          ></div>
        </div>

        <!-- Center line -->
        <div
          class="w-24 md:w-48 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 mx-4"
        ></div>

        <!-- Center icon/element -->
        <div class="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>

        <!-- Center line -->
        <div
          class="w-24 md:w-48 h-0.5 bg-gradient-to-l from-blue-500 via-blue-400 to-blue-500 mx-4"
        ></div>

        <!-- Decorative dots pattern -->
        <div class="flex space-x-2">
          <div
            v-for="i in 5"
            :key="i"
            class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"
            :style="{ animationDelay: `${(5 - i) * 0.1}s` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for static divider
</script>
