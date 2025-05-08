import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Composable to track when the HeroSection is halfway scrolled
 * @returns Object containing the state of whether the hero section is halfway scrolled
 */
export function useHeroScrollTracker() {
  // State to track if hero section is halfway scrolled
  const isHeroHalfwayScrolled = ref(false)

  // Function to check if hero section is halfway scrolled
  const checkHeroScroll = () => {
    // Get the hero section element
    const heroSection = document.querySelector('section:first-of-type')

    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect()
      const heroHeight = heroRect.height
      const heroTop = heroRect.top

      // Check if hero section is halfway scrolled (top is at -50% of its height)
      if (heroTop <= -heroHeight / 3) {
        isHeroHalfwayScrolled.value = true
      } else {
        isHeroHalfwayScrolled.value = false
      }
    }
  }

  onMounted(() => {
    // Initial check
    checkHeroScroll()

    // Add scroll event listener
    window.addEventListener('scroll', checkHeroScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    // Clean up event listener
    window.removeEventListener('scroll', checkHeroScroll)
  })

  return {
    isHeroHalfwayScrolled,
  }
}
