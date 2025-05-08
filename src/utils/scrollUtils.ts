/**
 * Utility function to handle smooth scrolling to sections with offset for fixed header
 * @param sectionId - The ID of the section to scroll to (including the # symbol)
 */
export const scrollToSection = (sectionId: string): void => {
  const element = document.querySelector(sectionId)
  if (element) {
    // Get the height of the navbar to offset the scrolling
    const navbarHeight = document.querySelector('nav')?.offsetHeight || 0

    // Calculate the element's position relative to the viewport
    const elementPosition = element.getBoundingClientRect().top

    // Calculate the offset position with additional padding (60px)
    const offsetPosition = elementPosition + window.scrollY - navbarHeight + 60

    // Scroll to the element with smooth behavior
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
