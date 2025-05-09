import { ref } from 'vue'

// Create a shared state for the BackToTopButton visibility
const isBackToTopVisible = ref(false)

export function useBackToTopVisibility() {
  return {
    isBackToTopVisible
  }
}
