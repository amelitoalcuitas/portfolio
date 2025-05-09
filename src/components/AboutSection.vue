<template>
  <section id="about" class="py-20 px-4 min-h-screen flex items-center" ref="sectionRef">
    <div class="container mx-auto w-full">
      <h2
        class="text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 transform"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
      >
        About <span class="text-blue-500">Me</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="space-y-6">
          <div
            class="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-700 transform hover:scale-105"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Who I Am
            </h3>
            <p class="text-gray-300">
              Hey there! I'm <span class="text-blue-500 font-bold"> Amelito N. Alcuitas Jr. </span>,
              but you can call me <span class="text-blue-500 font-bold"> Amelitz </span> or
              <span class="text-blue-500 font-bold"> Mel </span>. I'm a passionate Full Stack
              Developer and AI enthusiast with a strong focus on creating efficient, scalable, and
              user-friendly web applications. With over 5 years of experience in the industry, I've
              developed a deep understanding of both front-end and back-end technologies.
            </p>
          </div>

          <div
            class="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-700 transform hover:scale-105"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              My Approach
            </h3>
            <p class="text-gray-300">
              I believe in writing clean, maintainable code that solves real problems. My approach
              combines technical excellence with a focus on user experience and business goals. I'm
              constantly learning and adapting to new technologies and methodologies.
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <div
            class="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-700 transform hover:scale-105"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              What I Do
            </h3>
            <ul class="text-gray-300 space-y-2">
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-green-500 mt-0.5"
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
                Develop full-stack web and mobile applications
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-green-500 mt-0.5"
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
                Optimize application performance and user experience
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-green-500 mt-0.5"
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
                Collaborate with teams to deliver high-quality software
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-green-500 mt-0.5"
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
                Integrate third-party APIs and services
              </li>
            </ul>
          </div>

          <div
            class="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-700 transform hover:scale-105"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Where I'm Based
            </h3>
            <p class="text-gray-300">
              I'm currently based in Cebu City, Philippines, but I work remotely with clients and
              teams from around the world.
            </p>
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
