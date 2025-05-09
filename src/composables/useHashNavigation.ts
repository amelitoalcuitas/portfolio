import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { scrollToSection } from '../utils/scrollUtils'
import { useActiveSection } from './useActiveSection'

/**
 * Composable to handle URL hash navigation
 * - Scrolls to the section specified in the URL hash on page load
 * - Updates the URL hash when scrolling to different sections
 */
export function useHashNavigation() {
  const route = useRoute()
  const router = useRouter()
  const { activeSection } = useActiveSection()

  // Function to handle initial hash navigation
  const handleInitialHash = () => {
    if (route.hash) {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        scrollToSection(route.hash)
      }, 100)
    }
  }

  // Function to update URL hash without triggering a scroll
  const updateUrlHash = (sectionId: string) => {
    if (sectionId) {
      // Only update if the hash is different
      if (route.hash !== `#${sectionId}`) {
        // Use router.push with the current path and new hash
        router.push({
          path: route.path,
          hash: `#${sectionId}`
        })
      }
    }
  }

  // Watch for changes in the active section and update the URL hash
  watch(activeSection, (newSection) => {
    if (newSection) {
      updateUrlHash(newSection)
    }
  })

  // Handle hash changes in the URL
  const handleHashChange = () => {
    if (window.location.hash) {
      scrollToSection(window.location.hash)
    }
  }

  onMounted(() => {
    // Handle initial hash navigation
    handleInitialHash()

    // Listen for hash changes in the URL
    window.addEventListener('hashchange', handleHashChange)
  })

  onBeforeUnmount(() => {
    // Clean up event listener
    window.removeEventListener('hashchange', handleHashChange)
  })

  return {
    handleInitialHash,
    updateUrlHash
  }
}
