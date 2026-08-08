<template>
  <section id="projects" class="relative py-32 px-6" ref="sectionRef">
    <!-- Hidden container for ViewerJS -->
    <div class="hidden">
      <ul id="images" ref="galleryRef">
        <li v-for="(project, projectIndex) in projects" :key="projectIndex">
          <div v-for="(image, imageIndex) in project.images" :key="imageIndex">
            <img
              :src="image"
              :alt="`${project.title} - Screenshot ${imageIndex + 1}`"
              :data-project-index="projectIndex"
              :data-image-index="imageIndex"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="container mx-auto">
      <p
        class="section-eyebrow mb-4 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        04 &mdash; Projects
      </p>
      <h2
        class="section-heading text-4xl md:text-6xl font-semibold mb-20 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        Selected <span class="italic text-accent-400">work</span>
      </h2>

      <div class="space-y-28 md:space-y-40">
        <!-- Project Row (one for each project) -->
        <div
          v-for="(project, projectIndex) in projects"
          :key="projectIndex"
          :ref="
            (el) => {
              while (projectRefs.length <= projectIndex) {
                projectRefs.push(ref(null))
              }
              projectRefs[projectIndex].value = el
            }
          "
          class="rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-1000 hover:border-white/[0.16]"
          :class="
            projectVisibility[projectIndex]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-16'
          "
        >
          <!-- Project Content -->
          <div class="flex flex-col md:flex-row md:h-[600px]">
            <!-- Image Carousel (left side) -->
            <div v-if="project.images.length > 0" class="md:w-2/3 relative h-full bg-ink-800">
              <div
                class="overflow-hidden h-[380px] md:h-full"
                :ref="
                  (el) => {
                    while (carouselRefs.length <= projectIndex) {
                      carouselRefs.push(ref(null))
                    }
                    carouselRefs[projectIndex].value = el
                  }
                "
              >
                <div
                  class="flex transition-transform duration-500 ease-in-out h-full"
                  :style="{
                    transform: `translateX(-${projectCarouselIndices[projectIndex] * 100}%)`,
                  }"
                >
                  <div
                    v-for="(image, imageIndex) in project.images"
                    :key="imageIndex"
                    class="w-full flex-shrink-0 flex items-center justify-center p-6 md:p-10"
                  >
                    <img
                      :src="image"
                      :alt="`${project.title} - Screenshot ${imageIndex + 1}`"
                      class="max-w-full max-h-full object-contain cursor-pointer transition-transform duration-500 hover:scale-[1.02] shadow-2xl shadow-black/40"
                      @click="openImageViewer(projectIndex, imageIndex)"
                    />
                  </div>
                </div>
              </div>

              <!-- Carousel Navigation - Desktop only -->
              <button
                @click="prevImage(projectIndex)"
                class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-ink-900/70 backdrop-blur border border-white/10 hover:border-accent-400/50 text-mist-100 p-2.5 rounded-full transition-all duration-300 z-10 hidden md:block"
                :class="{ 'opacity-30 cursor-not-allowed': projectCarouselIndices[projectIndex] === 0 }"
                :disabled="projectCarouselIndices[projectIndex] === 0"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                @click="nextImage(projectIndex)"
                class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-ink-900/70 backdrop-blur border border-white/10 hover:border-accent-400/50 text-mist-100 p-2.5 rounded-full transition-all duration-300 z-10 hidden md:block"
                :class="{
                  'opacity-30 cursor-not-allowed':
                    projectCarouselIndices[projectIndex] === project.images.length - 1,
                }"
                :disabled="projectCarouselIndices[projectIndex] === project.images.length - 1"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Dots indicator -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                <button
                  v-for="(_, imageIndex) in project.images"
                  :key="imageIndex"
                  @click="goToImage(projectIndex, imageIndex)"
                  class="h-1.5 rounded-full transition-all duration-300"
                  :class="
                    projectCarouselIndices[projectIndex] === imageIndex
                      ? 'bg-accent-400 w-5'
                      : 'bg-white/25 hover:bg-white/40 w-1.5'
                  "
                ></button>
              </div>
            </div>

            <!-- No screenshots yet: show a live-preview placeholder instead of an empty carousel -->
            <div
              v-else
              class="md:w-2/3 relative h-[380px] md:h-full bg-ink-800 flex flex-col items-center justify-center gap-4 p-10 text-center"
            >
              <div
                class="h-14 w-14 rounded-2xl border border-accent-500/30 bg-accent-500/10 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p class="text-mist-400 max-w-xs">
                Live in staging &mdash; screenshots coming soon. Explore it yourself in the meantime.
              </p>
            </div>

            <!-- Project Description (right side) -->
            <div class="md:w-1/3 p-8 md:p-10 bg-ink-900 flex flex-col md:h-full">
              <span class="font-mono text-xs text-mist-400 mb-3">{{ String(projectIndex + 1).padStart(2, '0') }}</span>
              <h3 class="font-heading text-2xl md:text-3xl font-medium text-mist-100 mb-4 leading-tight">
                {{ project.title }}
              </h3>
              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  v-for="(tech, techIndex) in project.technologies"
                  :key="techIndex"
                  class="px-2.5 py-1 border border-white/10 text-mist-200 text-xs rounded-full font-mono"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="border-t border-white/[0.08] pt-6 mb-6 flex-1 overflow-y-auto">
                <p class="text-mist-400 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <div
                v-if="project.images.length > 0 || project.liveUrl || project.repoUrl"
                class="pt-6 border-t border-white/[0.08] flex-shrink-0 flex items-center justify-between gap-4"
              >
                <span v-if="project.images.length > 0" class="text-mist-400 text-xs font-mono">
                  {{ projectCarouselIndices[projectIndex] + 1 }} / {{ project.images.length }}
                </span>
                <span v-else></span>
                <div v-if="project.liveUrl || project.repoUrl" class="flex items-center gap-4 text-xs font-mono">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener"
                    class="text-mist-200 hover:text-accent-400 transition-colors"
                    >Live site &#8599;</a
                  >
                  <a
                    v-if="project.repoUrl"
                    :href="project.repoUrl"
                    target="_blank"
                    rel="noopener"
                    class="text-mist-200 hover:text-accent-400 transition-colors"
                    >GitHub &#8599;</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { useImageViewer } from '@/composables/useImageViewer'
import { useCarousel } from '@/composables/useCarousel'
import { useSwipe } from '@/composables/useSwipe'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
// Create refs for each project container
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const projectRefs: Ref<any>[] = []
// Create array to track visibility of each project
const projectVisibility = ref<boolean[]>([])
// Create refs for each carousel container
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carouselRefs: Ref<any>[] = []

// Function to get sorted image paths for a project
const getProjectImages = (projectFolder: string): string[] => {
  const images: string[] = []

  // Ordering Portal - 12 PNG images
  if (projectFolder === 'ordering-portal') {
    for (let i = 1; i <= 12; i++) {
      images.push(`/projects/ordering-portal/${i}.png`)
    }
  }
  // Triggerly - 11 JPG images
  else if (projectFolder === 'triggerly') {
    for (let i = 1; i <= 11; i++) {
      images.push(`/projects/triggerly/${i}.jpg`)
    }
  }
  // Zubbies - 4 PNG images without extension
  else if (projectFolder === 'zubbies') {
    for (let i = 1; i <= 4; i++) {
      images.push(`/projects/zubbies/${i}`)
    }
  }
  // Shortly - 6 PNG images
  else if (projectFolder === 'shortly') {
    for (let i = 1; i <= 6; i++) {
      images.push(`/projects/shortly/${i}.png`)
    }
  }
  // Aktiv - 7 PNG images
  else if (projectFolder === 'aktiv') {
    for (let i = 1; i <= 7; i++) {
      images.push(`/projects/aktiv/${i}.png`)
    }
  }

  return images
}

// Project data
const projects = [
  {
    title: 'Aktiv — Sports Hub Scheduler',
    description:
      'A sports hub discovery and booking platform I built end-to-end. Players explore local hubs, reserve courts on a custom real-time scheduling grid, join open-play sessions, and compete in tournaments with live brackets and leaderboards.',
    images: getProjectImages('aktiv'),
    technologies: ['Nuxt.js', 'Vue.js', 'Laravel', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://staging.aktivhub.app/',
    repoUrl: 'https://github.com/amelitoalcuitas/aktiv',
  },
  {
    title: 'Shortly',
    description:
      'A URL shortener app with a minimalistic design. Features include URL clicks count tracking, custom code/slug creation, and expiration settings for links.',
    images: getProjectImages('shortly'),
    technologies: ['React.js', 'Knex.js', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Ordering Portal',
    description:
      'Developed an ordering portal with dedicated views for both admin and customers. Primarily focused on frontend development, with occasional contributions to backend tasks.',
    images: getProjectImages('ordering-portal'),
    technologies: ['Vue.js', 'Nuxt.js', 'Typescript', 'JSON API', 'Laravel'],
  },
  {
    title: 'Triggerly - Acid Reflux Trigger Tracker',
    description:
      'Built Triggerly, an acid reflux trigger tracker app, using Flutter. Developed core features including meal logging, trigger analysis, and personalized health insights. Integrated an AI-powered Meal Analyzer to assess foods and identify potential reflux triggers.',
    images: getProjectImages('triggerly'),
    technologies: ['Flutter', 'Sqflite'],
  },
  {
    title: 'Zubbies',
    description:
      'Zubbies: a job scheduler and employee management system for web and mobile with Multitenancy.',
    images: getProjectImages('zubbies'),
    technologies: ['Flutter', 'Node.js', 'Firebase'],
  },
]

// Use the carousel composable
const {
  projectCarouselIndices,
  nextImage,
  prevImage,
  goToImage,
  startAutoplay,
  pauseAutoplay,
  resumeAutoplay,
} = useCarousel(projects)

// Use the image viewer composable
const { galleryRef, openImageViewer } = useImageViewer(projects, pauseAutoplay, resumeAutoplay)

onMounted(() => {
  startAutoplay()

  // Initialize project visibility array with false values
  projectVisibility.value = projects.map(() => false)

  // Create an Intersection Observer to detect when the section is visible or hidden
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      // Check if the section is intersecting with the viewport
      if (entries[0].isIntersecting) {
        isVisible.value = true
      } else {
        // Reset visibility when section is out of view for reanimation when scrolling back
        isVisible.value = false
      }
    },
    {
      // Trigger when at least 20% of the element is visible
      threshold: 0.1
    },
  )

  // Start observing the section element
  if (sectionRef.value) {
    sectionObserver.observe(sectionRef.value)
  }

  // Create an Intersection Observer for each project
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        // Find the project index from the data attribute
        const projectIndex = parseInt(entry.target.getAttribute('data-project-index') || '0')

        // Update the visibility state for this project
        if (entry.isIntersecting) {
          projectVisibility.value[projectIndex] = true
        } else {
          // Optional: Reset visibility when project is out of view
          // projectVisibility.value[projectIndex] = false
        }
      })
    },
    {
      // Trigger when at least 30% of the project is visible
      threshold: 0.3,
      // Start animation slightly before the project comes into view
      rootMargin: '0px 0px -10% 0px'
    }
  )

  // Wait for the DOM to update with refs
  setTimeout(() => {
    // Start observing each project element
    projectRefs.forEach((projectRef, index) => {
      if (projectRef.value) {
        // Add a data attribute to identify the project
        projectRef.value.setAttribute('data-project-index', index.toString())
        projectObserver.observe(projectRef.value)
      }
    })
  }, 100)

  // Set up swipe functionality for each carousel
  projects.forEach((_, projectIndex) => {
    // Add swipe handlers to each carousel container
    useSwipe(
      carouselRefs[projectIndex],
      {
        onSwipeLeft: () => nextImage(projectIndex),
        onSwipeRight: () => prevImage(projectIndex),
      },
      {
        threshold: 50, // Make it easier to swipe on mobile
        restraint: 100,
        allowedTime: 500, // Allow more time for the swipe
      },
    )
  })

  // Clean up the observers when component is unmounted
  onBeforeUnmount(() => {
    // Disconnect section observer
    if (sectionObserver) {
      sectionObserver.disconnect()
    }

    // Disconnect project observer
    if (projectObserver) {
      projectObserver.disconnect()
    }
  })
})

// Cleanup is handled by the composables
</script>
