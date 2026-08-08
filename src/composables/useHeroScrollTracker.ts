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
      const heroTop = heroSection.getBoundingClientRect().top

      // Trigger the nav's solid/blurred state almost as soon as scrolling starts,
      // rather than waiting for a large fraction of the hero to scroll past.
      if (heroTop <= -40) {
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
