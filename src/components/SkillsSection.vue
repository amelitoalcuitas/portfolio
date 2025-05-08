<template>
  <section
    id="skills"
    class="py-20 px-4 bg-gray-800 min-h-screen flex items-center"
    ref="sectionRef"
  >
    <div class="container mx-auto">
      <h2
        class="text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 transform"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
      >
        My <span class="text-blue-500">Skills</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Frontend Skills -->
        <div
          class="bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
          :style="{ transitionDelay: '200ms' }"
        >
          <div class="flex items-center mb-6">
            <div class="p-3 bg-blue-600 rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white">Front-End</h3>
          </div>

          <div class="space-y-4">
            <div v-for="(skill, index) in frontendSkills" :key="index">
              <div class="flex justify-between mb-1">
                <span class="text-gray-300">{{ skill.name }}</span>
                <span class="text-blue-400">{{ skill.level }}</span>
              </div>
              <div class="w-full bg-gray-600 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: isVisible ? skill.percentage : '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend Skills -->
        <div
          class="bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
          :style="{ transitionDelay: '400ms' }"
        >
          <div class="flex items-center mb-6">
            <div class="p-3 bg-green-600 rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white">Back-End</h3>
          </div>

          <div class="space-y-4">
            <div v-for="(skill, index) in backendSkills" :key="index">
              <div class="flex justify-between mb-1">
                <span class="text-gray-300">{{ skill.name }}</span>
                <span class="text-green-400">{{ skill.level }}</span>
              </div>
              <div class="w-full bg-gray-600 rounded-full h-2">
                <div
                  class="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: isVisible ? skill.percentage : '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Database Skills -->
        <div
          class="bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
          :style="{ transitionDelay: '600ms' }"
        >
          <div class="flex items-center mb-6">
            <div class="p-3 bg-purple-600 rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white">Databases</h3>
          </div>

          <div class="space-y-4">
            <div v-for="(skill, index) in databaseSkills" :key="index">
              <div class="flex justify-between mb-1">
                <span class="text-gray-300">{{ skill.name }}</span>
                <span class="text-purple-400">{{ skill.level }}</span>
              </div>
              <div class="w-full bg-gray-600 rounded-full h-2">
                <div
                  class="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: isVisible ? skill.percentage : '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools Skills -->
        <div
          class="bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
          :style="{ transitionDelay: '800ms' }"
        >
          <div class="flex items-center mb-6">
            <div class="p-3 bg-yellow-600 rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white">Tools</h3>
          </div>

          <div class="space-y-4">
            <div v-for="(skill, index) in toolsSkills" :key="index">
              <div class="flex justify-between mb-1">
                <span class="text-gray-300">{{ skill.name }}</span>
                <span class="text-yellow-400">{{ skill.level }}</span>
              </div>
              <div class="w-full bg-gray-600 rounded-full h-2">
                <div
                  class="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: isVisible ? skill.percentage : '0%' }"
                ></div>
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

const frontendSkills = [
  { name: 'HTML/CSS', level: 'Expert', percentage: '95%' },
  { name: 'JavaScript/TypeScript', level: 'Expert', percentage: '95%' },
  { name: 'Vue.js', level: 'Expert', percentage: '90%' },
  { name: 'React', level: 'Intermediate', percentage: '75%' },
  { name: 'Flutter', level: 'Advanced', percentage: '85%' },
]

const backendSkills = [
  { name: 'Node.js', level: 'Advanced', percentage: '85%' },
  { name: 'Express.js', level: 'Advanced', percentage: '85%' },
  { name: 'Laravel', level: 'Basic', percentage: '50%' },
  { name: 'PHP', level: 'Basic', percentage: '50%' },
]

const databaseSkills = [
  { name: 'MongoDB', level: 'Advanced', percentage: '85%' },
  { name: 'MySQL', level: 'Advanced', percentage: '80%' },
  { name: 'PostgreSQL', level: 'Intermediate', percentage: '75%' },
  { name: 'Firebase', level: 'Advanced', percentage: '85%' },
]

const toolsSkills = [
  { name: 'Git', level: 'Advanced', percentage: '90%' },
  { name: 'Docker', level: 'Intermediate', percentage: '70%' },
  { name: 'Postman', level: 'Advanced', percentage: '85%' },
  { name: 'VS Code', level: 'Expert', percentage: '95%' },
  { name: 'AI Tools', level: 'Advanced', percentage: '90%' },
]

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
