<template>
  <section
    id="experience"
    class="py-20 px-4 bg-gray-800 min-h-screen flex items-center"
    ref="sectionRef"
  >
    <div class="container mx-auto">
      <h2
        class="text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 transform"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
      >
        Work <span class="text-blue-500">Experience</span>
      </h2>

      <div class="max-w-4xl mx-auto">
        <!-- Experience Items -->
        <div
          v-for="(experience, index) in experiences"
          :key="experience.title"
          :class="[
            'bg-gray-700 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-700',
            index < experiences.length - 1 ? 'mb-12' : '',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
          ]"

        >
          <div class="p-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-white">{{ experience.title }}</h3>
              <div
                class="mt-2 md:mt-0 text-center px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
              >
                {{ experience.period }}
              </div>
            </div>
            <h4 class="text-lg font-semibold text-blue-400 mb-4">{{ experience.company }}</h4>

            <ul class="space-y-3 text-gray-300">
              <li
                v-for="(responsibility, rIndex) in experience.responsibilities"
                :key="rIndex"
                class="flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2 text-green-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{{ responsibility }}</span>
              </li>
            </ul>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="(tech, tIndex) in experience.technologies"
                :key="tIndex"
                class="px-3 py-1 bg-gray-600 text-gray-300 rounded-full text-sm"
              >
                {{ tech }}
              </span>
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

// Experience data
const experiences = [
  {
    title: 'Full Stack Web Developer',
    company: 'Lanex Corporation',
    period: '2021 - Present',
    responsibilities: [
      'Built and maintained web and mobile apps with a focus on performance and UX.',
      'Improved app speed by up to 30% through code optimization and debugging.',
      'Collaborated with a remote team across the full development lifecycle.',
      'Integrated third-party APIs and services to extend application functionality.',
    ],
    technologies: ['Vue.js', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  },
  {
    title: 'Freelance Developer',
    company: 'Freelance',
    period: '2019 - 2020',
    responsibilities: [
      'Delivered custom academic web and mobile projects for student clients.',
      'Managed end-to-end development, from design to deployment.',
      'Ensured clean, maintainable code and responsive interfaces.',
      'Communicated directly with clients to gather requirements and provide support.',
    ],
    technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress'],
  },
  {
    title: 'Full Stack Web Developer',
    company: 'Bluefrog Contents and Support Inc.',
    period: '2017 - 2018',
    responsibilities: [
      'Developed full-stack applications and integrated back-end APIs.',
      'Wrote clean, scalable code for both front-end and back-end components.',
      'Used modern frameworks to enhance software functionality and UX.',
      'Maintained and updated legacy systems for improved stability and performance.',
    ],
    technologies: ['JavaScript', 'jQuery', 'PHP', 'Laravel', 'MySQL'],
  },
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


