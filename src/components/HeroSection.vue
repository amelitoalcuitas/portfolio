<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center py-24 px-6 overflow-hidden"
    ref="sectionRef"
    @mousemove="handleMouseMove"
  >
    <!-- Cursor-follow spotlight, hero only -->
    <div class="pointer-events-none absolute inset-0 z-0 hidden md:block" :style="spotlightStyle"></div>

    <div class="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
      <!-- Text content -->
      <div class="md:col-span-6 order-2 md:order-1">
        <p
          class="section-eyebrow mb-6 transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Full Stack Developer &mdash; Cebu, Philippines
        </p>

        <h1 class="font-heading font-semibold text-[clamp(2.75rem,9vw,7rem)] leading-[0.98] tracking-tight mb-8">
          <span class="block overflow-hidden">
            <span
              class="block transition-all duration-700 ease-out"
              :class="isVisible ? 'translate-y-0' : 'translate-y-full'"
              >Amelito</span
            >
          </span>
          <span class="block overflow-hidden">
            <span
              class="block italic text-gradient transition-all duration-700 ease-out"
              :class="isVisible ? 'translate-y-0' : 'translate-y-full'"
              style="transition-delay: 120ms"
              >Alcuitas</span
            >
          </span>
        </h1>

        <p
          class="text-lg md:text-xl text-mist-400 max-w-lg mb-10 leading-relaxed transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 320ms"
        >
          I design and build full-stack products &mdash; from pixel-level interface work to the
          APIs and databases underneath. 5+ years turning ideas into software people actually use.
        </p>

        <div
          class="flex flex-wrap items-center gap-4 transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 460ms"
        >
          <a
            href="#projects"
            @click.prevent="scrollToSection('#projects')"
            class="group inline-flex items-center gap-2 px-6 py-3 bg-mist-100 text-ink-950 rounded-full font-medium text-sm transition-all duration-300 hover:bg-accent-400 hover:text-ink-950"
          >
            View my work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <div class="flex items-center gap-1 ml-1">
            <a
              href="https://github.com/amelitoalcuitas"
              target="_blank"
              class="p-3 text-mist-400 hover:text-mist-100 transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/amelitoalcuitas"
              target="_blank"
              class="p-3 text-mist-400 hover:text-mist-100 transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <a
              href="/Amelito Alcuitas (Resume).pdf"
              target="_blank"
              class="p-3 text-mist-400 hover:text-mist-100 transition-colors duration-300"
              aria-label="View Resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Photo -->
      <div
        class="md:col-span-6 order-1 md:order-2 flex justify-center md:justify-start md:-ml-16 transition-all duration-1000"
        :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
        style="transition-delay: 180ms"
      >
        <div class="relative w-96 md:w-full">
          <!-- Glow -->
          <div
            class="absolute -inset-8 rounded-full opacity-60 blur-3xl"
            style="background: radial-gradient(circle, rgba(139, 92, 246, 0.35), transparent 70%)"
          ></div>
          <div
            class="relative aspect-[4/5] overflow-hidden"
            style="
              mask-image:
                linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
                linear-gradient(to bottom, black 70%, transparent 96%);
              mask-composite: intersect;
              -webkit-mask-image:
                linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
                linear-gradient(to bottom, black 70%, transparent 96%);
              -webkit-mask-composite: source-in;
            "
          >
            <img
              src="/me.png"
              alt="Amelito N. Alcuitas Jr."
              class="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <div
      class="absolute bottom-10 inset-x-0 flex justify-center transition-all duration-1000 z-10"
      :class="isVisible ? 'opacity-100' : 'opacity-0'"
      style="transition-delay: 700ms"
    >
      <a
        href="#about"
        @click.prevent="scrollToSection('#about')"
        class="flex items-center gap-3 text-mist-400 hover:text-mist-100 transition-colors duration-300 cursor-pointer group"
      >
        <span class="font-mono text-[11px] uppercase tracking-widest">Scroll</span>
        <span class="h-8 w-px bg-mist-400/40 relative overflow-hidden">
          <span class="absolute inset-x-0 top-0 h-full bg-accent-400 animate-scroll-line"></span>
        </span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { scrollToSection } from '../utils/scrollUtils'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const mouseX = ref(50)
const mouseY = ref(50)

const spotlightStyle = computed(() => ({
  background: `radial-gradient(38rem 38rem at ${mouseX.value}% ${mouseY.value}%, rgba(139, 92, 246, 0.08), transparent 60%)`,
}))

const handleMouseMove = (e: MouseEvent) => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((e.clientY - rect.top) / rect.height) * 100
}

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.2 },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  onUnmounted(() => {
    if (sectionRef.value) {
      observer.unobserve(sectionRef.value)
    }
  })
})
</script>

<style scoped>
@keyframes scroll-line {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.animate-scroll-line {
  animation: scroll-line 1.6s ease-in-out infinite;
}
</style>
