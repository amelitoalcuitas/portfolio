<template>
  <section
    class="relative min-h-screen flex items-center justify-center py-20 px-4"
    ref="sectionRef"
  >

    <div class="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
      <!-- Text Content - Left Side on Desktop, Bottom on Mobile -->
      <div class="md:w-1/2 text-center md:text-right mt-10 md:mt-0">
        <h1
          class="text-4xl md:text-6xl mb-4 font-heading transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
        >
          <span class="block sm:inline text-gray-300">Hi, my </span>
          <span class="block sm:inline"
            >name is <span class="text-blue-500 font-bold">Amelito</span>.</span
          >
        </h1>
        <h2
          class="text-xl md:text-2xl text-gray-300 mb-6 font-heading transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
          :style="{ transitionDelay: '200ms' }"
        >
          I'm a <span class="text-blue-400 font-bold">full stack developer</span> from Cebu,
          Philippines.
        </h2>
      </div>

      <!-- Image - Right Side on Desktop, Top on Mobile -->
      <div
        class="md:w-1/2 flex justify-center transition-all duration-1000 transform"
        :class="
          isVisible
            ? 'opacity-100 translate-y-0 md:translate-x-0'
            : 'opacity-0 -translate-y-10 md:translate-y-0 md:translate-x-20'
        "
      >
        <div class="relative group">
          <!-- Light background area behind the image -->
          <div
            class="absolute inset-0 bg-blue-100 bg-opacity-20 transform scale-110 rounded-lg transition-all duration-300 group-hover:scale-115"
            :class="isHeroHalfwayScrolled ? 'bg-spin-out' : 'bg-spin-in'"
          ></div>

          <!-- Profile image -->
          <div
            class="relative w-64 h-64 md:w-80 md:h-96 overflow-hidden rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/20"
            :class="isHeroHalfwayScrolled ? 'hero-image-exit' : 'hero-image-enter'"
          >
            <img
              src="/me.jpg"
              alt="Amelito N. Alcuitas Jr."
              class="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll down indicator -->
    <div
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-1000 z-10"
      :class="isVisible ? 'opacity-100' : 'opacity-0'"
      :style="{ transitionDelay: '800ms' }"
    >
      <a
        href="#about"
        @click.prevent="scrollToSection('#about')"
        class="text-gray-400 hover:text-white cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { scrollToSection } from '../utils/scrollUtils'
import { useHeroScrollTracker } from '../composables/useHeroScrollTracker'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Use the hero scroll tracker composable
const { isHeroHalfwayScrolled } = useHeroScrollTracker()

onMounted(() => {
  // Set isVisible to true immediately for better user experience on initial load
  isVisible.value = true

  // Create an Intersection Observer to detect when the section is visible or hidden
  const observer = new IntersectionObserver(
    (entries) => {
      // Check if the section is intersecting with the viewport
      if (entries[0].isIntersecting) {
        isVisible.value = true
      } else {
        // Optional: Reset animations when section is out of view
        // isVisible.value = false
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

<style scoped>
.hero-image-exit {
  animation: float-up 0.3s ease-in-out forwards;
  transform-origin: center;
}

.hero-image-enter {
  animation: float-down 0.3s ease-in-out forwards;
  transform-origin: center;
}

.bg-spin-out {
  animation: spin-out 0.3s ease-in-out forwards;
  transform-origin: center;
}

.bg-spin-in {
  animation: spin-in 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes float-up {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
}

@keyframes float-down {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin-out {
  0% {
    transform: rotate(1deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(10deg) scale(0.8);
    opacity: 0;
  }
}

@keyframes spin-in {
  0% {
    transform: rotate(-10deg) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: rotate(3deg) scale(1);
    opacity: 1;
  }
}
</style>
