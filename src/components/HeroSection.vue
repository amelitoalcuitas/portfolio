<template>
  <section
    class="relative min-h-screen flex items-center justify-center py-20 px-4"
    ref="sectionRef"
  >
    <div
      class="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10"
    >
      <!-- Text Content - Left Side on Desktop, Bottom on Mobile -->
      <div class="md:w-1/2 text-center md:text-right mt-10 md:mt-0">
        <h1 class="text-4xl md:text-6xl mb-4 font-heading">
          <span class="typewriter-container">
            <span class="typewriter-text" ref="typewriterText"></span>
          </span>
        </h1>
        <h2
          class="text-xl md:text-2xl text-gray-300 mb-6 font-heading transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
          :style="{ transitionDelay: '200ms' }"
        >
          I'm a <span class="text-blue-400 font-bold">full stack developer</span> from Cebu,
          Philippines.
        </h2>

        <!-- Social Links and Resume -->
        <div
          class="flex space-x-4 justify-center md:justify-end mt-6 transition-all duration-700 transform"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
          :style="{ transitionDelay: '400ms' }"
        >
          <!-- GitHub Button -->
          <div class="relative group">
            <a
              href="https://github.com/amelitoalcuitas"
              target="_blank"
              class="p-3 bg-gray-800 hover:bg-blue-600 text-white rounded-full transition-colors duration-300 flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <!-- Tooltip -->
            <div class="tooltip-text">GitHub</div>
          </div>

          <!-- LinkedIn Button -->
          <div class="relative group">
            <a
              href="https://linkedin.com/in/amelitoalcuitas"
              target="_blank"
              class="p-3 bg-gray-800 hover:bg-blue-600 text-white rounded-full transition-colors duration-300 flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <!-- Tooltip -->
            <div class="tooltip-text">LinkedIn</div>
          </div>

          <!-- Resume Button -->
          <div class="relative group">
            <a
              href="/Amelito Alcuitas (Resume).pdf"
              target="_blank"
              class="p-3 bg-gray-800 hover:bg-blue-600 text-white rounded-full transition-colors duration-300 flex items-center justify-center"
              aria-label="View Resume"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
            <!-- Tooltip -->
            <div class="tooltip-text">View Resume</div>
          </div>
        </div>
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
const typewriterText = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Use the hero scroll tracker composable
const { isHeroHalfwayScrolled } = useHeroScrollTracker()

// Typewriter effect function
const typeWriter = (
  textParts: string[],
  currentPart: number,
  currentChar: number,
  fnCallback?: () => void,
) => {
  // Check if the element exists
  if (!typewriterText.value) return

  // Set a speed for the typing effect (in milliseconds)
  const speed = 100

  // Get the current part we're typing
  const part = textParts[currentPart]

  if (currentChar < part.length) {
    // We're still typing the current part
    if (currentPart === 0) {
      // First part (regular text)
      typewriterText.value.innerHTML = part.substring(0, currentChar + 1)
    } else if (currentPart === 1) {
      // Second part (name with styling)
      typewriterText.value.innerHTML =
        textParts[0] +
        `<span class="text-blue-500 font-bold">${part.substring(0, currentChar + 1)}</span>`
    } else if (currentPart === 2) {
      // Third part (period)
      typewriterText.value.innerHTML =
        textParts[0] +
        `<span class="text-blue-500 font-bold">${textParts[1]}</span>` +
        part.substring(0, currentChar + 1)
    }

    // Call this function again after a delay to type the next character
    setTimeout(() => {
      typeWriter(textParts, currentPart, currentChar + 1, fnCallback)
    }, speed)
  } else if (currentPart < textParts.length - 1) {
    // Move to the next part
    setTimeout(() => {
      typeWriter(textParts, currentPart + 1, 0, fnCallback)
    }, speed)
  } else if (typeof fnCallback === 'function') {
    // All parts are done, call the callback
    setTimeout(fnCallback, 700)
  }
}

// Start the typewriter animation
const startTypewriter = () => {
  // Break the text into parts to handle styling separately
  const textParts = ['Hi, my name is ', 'Amelito', '.']

  // Start typing with the first part, first character
  typeWriter(textParts, 0, 0)
}

onMounted(() => {
  // Set isVisible to true immediately for better user experience on initial load
  isVisible.value = true

  // Start the typewriter effect after a short delay
  setTimeout(() => {
    startTypewriter()
  }, 500)

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

/* Tooltip Styles */
.tooltip-text {
  visibility: hidden;
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(30, 41, 59, 0.9);
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  z-index: 10;
}

/* Show the tooltip when hovering over the parent */
.group:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Add a small arrow at the top of the tooltip */
.tooltip-text::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent rgba(30, 41, 59, 0.9) transparent;
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

/* Typewriter styles */
.typewriter-container {
  display: inline-block;
}

.typewriter-text {
  display: inline-block;
}

.typewriter-cursor {
  display: inline-block;
  color: #3b82f6; /* blue-500 */
  font-weight: bold;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
