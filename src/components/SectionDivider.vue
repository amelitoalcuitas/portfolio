<template>
  <div class="w-full py-6 relative z-10 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-center">
        <!-- Left line -->
        <div
          class="flex-grow h-px bg-gradient-to-r from-transparent to-blue-500 max-w-xs md:max-w-md"
        ></div>

        <!-- Center icon/element -->
        <div class="mx-4 text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 transform rotate-45 animate-spin-slow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>

        <!-- Right line -->
        <div
          class="flex-grow h-px bg-gradient-to-l from-transparent to-blue-500 max-w-xs md:max-w-md"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for static divider
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
}
</style>
