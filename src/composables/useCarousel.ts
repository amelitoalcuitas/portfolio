import { ref, onBeforeUnmount } from 'vue'

export interface Project {
  title: string
  description: string
  images: string[]
  technologies: string[]
}

export function useCarousel(projects: Project[]) {
  // Carousel state
  const projectCarouselIndices = ref<number[]>(projects.map(() => 0))
  const autoplayIntervals = ref<(number | null)[]>([])
  const autoplayActive = ref(true)

  // Carousel navigation functions
  const nextImage = (projectIndex: number) => {
    const maxIndex = projects[projectIndex].images.length - 1
    if (projectCarouselIndices.value[projectIndex] < maxIndex) {
      projectCarouselIndices.value[projectIndex]++
    }
  }

  const prevImage = (projectIndex: number) => {
    if (projectCarouselIndices.value[projectIndex] > 0) {
      projectCarouselIndices.value[projectIndex]--
    }
  }

  const goToImage = (projectIndex: number, imageIndex: number) => {
    projectCarouselIndices.value[projectIndex] = imageIndex
  }

  // Stop all autoplay intervals
  const stopAutoplay = () => {
    autoplayIntervals.value.forEach((interval) => {
      if (interval) {
        clearInterval(interval)
      }
    })
    autoplayIntervals.value = []
  }

  // Autoplay management
  const startAutoplay = () => {
    if (!autoplayActive.value) return

    projects.forEach((_, index) => {
      const interval = window.setInterval(
        () => {
          if (!autoplayActive.value) return

          const maxIndex = projects[index].images.length - 1
          if (projectCarouselIndices.value[index] < maxIndex) {
            projectCarouselIndices.value[index]++
          } else {
            projectCarouselIndices.value[index] = 0
          }
        },
        5000 + index * 1000,
      ) // Stagger the timing for each carousel

      autoplayIntervals.value[index] = interval
    })
  }

  const pauseAutoplay = () => {
    autoplayActive.value = false
    stopAutoplay()
  }

  const resumeAutoplay = () => {
    autoplayActive.value = true
    startAutoplay()
  }

  // Clean up on component unmount
  onBeforeUnmount(() => {
    stopAutoplay()
  })

  return {
    projectCarouselIndices,
    nextImage,
    prevImage,
    goToImage,
    startAutoplay,
    pauseAutoplay,
    resumeAutoplay,
    stopAutoplay,
    autoplayActive
  }
}
