<template>
  <section id="education" class="py-20 px-4 min-h-screen flex items-center" ref="sectionRef">
    <div class="container mx-auto">
      <h2
        class="text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 transform"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
      >
        My <span class="text-blue-500">Education</span>
      </h2>

      <div class="max-w-3xl mx-auto">
        <div
          class="relative pl-8 sm:pl-32 py-6 group transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'"
          :style="{ transitionDelay: '200ms' }"
        >
          <!-- Timeline line -->
          <div
            class="absolute top-0 left-0 sm:left-16 h-full w-1 bg-blue-500 group-first:rounded-t-lg group-last:rounded-b-lg"
          ></div>

          <!-- Timeline circle -->
          <div
            class="absolute top-6 left-0 sm:left-16 -ml-2.5 h-6 w-6 rounded-full border-4 border-blue-500 bg-gray-900 z-10"
          ></div>

          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold text-white mb-1">
              Bachelor of Science in Information and Communications Technology
            </h3>
            <h4 class="text-lg font-semibold text-blue-400 mb-3">University of San Carlos</h4>
            <div class="flex items-center text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>2012 - 2017</span>
            </div>
            <p class="text-gray-300">
              Completed a comprehensive program focused on software development, database
              management, networking, and systems analysis. Gained strong foundations in both
              theoretical concepts and practical applications of information technology.
            </p>
            <div class="mt-4 text-blue-300 font-medium">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Dean's Lister, A.Y. 2015 - 2016, A.Y. 2016 - 2017
              </div>
            </div>
          </div>
        </div>

        <!-- Additional education entries can be added here -->
        <div
          class="relative pl-8 sm:pl-32 py-6 group transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'"
          :style="{ transitionDelay: '400ms' }"
        >
          <!-- Timeline line -->
          <div
            class="absolute top-0 left-0 sm:left-16 h-full w-1 bg-blue-500 group-first:rounded-t-lg group-last:rounded-b-lg"
          ></div>

          <!-- Timeline circle -->
          <div
            class="absolute top-6 left-0 sm:left-16 -ml-2.5 h-6 w-6 rounded-full border-4 border-blue-500 bg-gray-900 z-10"
          ></div>

          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold text-white mb-1">Professional Development</h3>
            <h4 class="text-lg font-semibold text-blue-400 mb-3">Various Online Platforms</h4>
            <div class="flex items-center text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>2017 - Present</span>
            </div>
            <p class="text-gray-300">
              Continuously expanding my knowledge through online courses, workshops, and
              certifications in modern web development technologies, frameworks, and best practices.
              Focused on staying current with industry trends and emerging technologies.
            </p>
            <div class="mt-4 text-blue-300 font-medium">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Various certifications in web development technologies
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  // Create an Intersection Observer to detect when the section is visible or hidden
  const observer = new IntersectionObserver(
    (entries) => {
      // Check if the section is intersecting with the viewport
      if (entries[0].isIntersecting) {
        isVisible.value = true
      }
    },
    {
      // Trigger when at least 20% of the element is visible
      threshold: 0.2,
    },
  )

  // Start observing the section element
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  // Clean up the observer when component is unmounted
  onUnmounted(() => {
    if (sectionRef.value) {
      observer.unobserve(sectionRef.value)
    }
  })
})
</script>
