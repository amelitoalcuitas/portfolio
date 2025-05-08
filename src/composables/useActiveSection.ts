import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Composable to track the active section in the viewport
 * @returns Object containing the active section ID and a method to check if a section is active
 */
export function useActiveSection() {
  // Store the current active section ID (without the # symbol)
  const activeSection = ref<string>('')

  // Function to check if a section is active
  const isSectionActive = (sectionId: string): boolean => {
    // Remove the # if it exists in the passed sectionId
    const normalizedId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId
    return normalizedId === activeSection.value
  }

  // Function to determine which section is currently in view
  const checkActiveSection = () => {
    // Get all sections that have an ID
    const sections = document.querySelectorAll('section[id]')
    
    // Get the height of the navbar to account for the offset
    const navbarHeight = document.querySelector('nav')?.offsetHeight || 0
    
    // Add a small buffer to improve user experience
    const buffer = 100

    // Check each section's position
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const sectionBottom = section.getBoundingClientRect().bottom
      
      // Consider a section active if its top is near the top of the viewport (accounting for navbar)
      // or if we're viewing a section that takes up most of the viewport
      if (
        (sectionTop <= navbarHeight + buffer && sectionBottom > navbarHeight) ||
        (sectionTop <= navbarHeight + buffer && sectionTop > 0)
      ) {
        activeSection.value = section.id
      }
    })

    // If we're at the top of the page, set the first section as active
    if (window.scrollY === 0 && sections.length > 0) {
      activeSection.value = sections[0].id
    }
    
    // If we're at the bottom of the page, set the last section as active
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      if (sections.length > 0) {
        activeSection.value = sections[sections.length - 1].id
      }
    }
  }

  onMounted(() => {
    // Initial check
    checkActiveSection()
    
    // Add scroll event listener
    window.addEventListener('scroll', checkActiveSection, { passive: true })
  })

  onBeforeUnmount(() => {
    // Clean up event listener
    window.removeEventListener('scroll', checkActiveSection)
  })

  return {
    activeSection,
    isSectionActive
  }
}
