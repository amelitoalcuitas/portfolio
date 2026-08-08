<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500"
    :class="isHeroHalfwayScrolled ? 'bg-ink-900/80 backdrop-blur-md border-white/[0.06]' : 'bg-transparent border-transparent'"
  >
    <div class="container mx-auto flex justify-between items-center px-6 py-5">
      <!-- Wordmark -->
      <a
        href="#home"
        @click.prevent="scrollToSection('#home')"
        class="flex items-center font-heading text-lg font-semibold text-mist-100 tracking-tight"
      >
        <span
          class="h-11 overflow-hidden flex-shrink-0 transition-all duration-500 ease-out"
          :class="isHeroHalfwayScrolled ? 'w-11 mr-3' : 'w-0 mr-0'"
        >
          <span
            class="block w-11 h-11 rounded-full overflow-hidden border transition-all duration-500 ease-out"
            :class="
              isHeroHalfwayScrolled
                ? 'opacity-100 translate-y-0 border-white/10'
                : 'opacity-0 translate-y-3 border-transparent'
            "
          >
            <img src="/me.png" alt="Amelito N. Alcuitas Jr." class="w-11 h-11 object-cover object-top" />
          </span>
        </span>
        <span>Amelitz<span class="text-accent-400">.</span></span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-widest relative">
        <a
          v-for="(item, index) in navItems"
          :key="index"
          :ref="(el) => setNavLinkRef(el, index)"
          :href="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="px-4 py-2 transition-colors duration-300 cursor-pointer"
          :class="isSectionActive(item.href) ? 'text-mist-100' : 'text-mist-400 hover:text-mist-200'"
        >
          {{ item.name }}
        </a>
        <span
          class="absolute -bottom-0.5 h-px bg-accent-400 transition-all duration-400 ease-out"
          :style="{ left: indicatorLeft + 'px', width: indicatorWidth + 'px' }"
        ></span>
      </div>

      <!-- Mobile toggle -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden text-mist-100 p-2 -mr-2"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-show="isMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-ink-900/95 backdrop-blur-md border-b border-white/[0.06] py-4 px-6"
      >
        <div class="flex flex-col">
          <a
            v-for="(item, index) in navItems"
            :key="index"
            :href="item.href"
            class="py-3 font-mono text-xs uppercase tracking-widest border-b border-white/[0.04] last:border-none transition-colors duration-300"
            :class="isSectionActive(item.href) ? 'text-accent-400' : 'text-mist-400'"
            @click.prevent="handleMobileClick(item.href)"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { scrollToSection } from '../utils/scrollUtils'
import { useActiveSection } from '../composables/useActiveSection'
import { useHeroScrollTracker } from '../composables/useHeroScrollTracker'

const isMenuOpen = ref(false)

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

const { activeSection, isSectionActive } = useActiveSection()
const { isHeroHalfwayScrolled } = useHeroScrollTracker()

// Single sliding underline that tracks whichever nav link is currently active,
// instead of each link owning its own independent underline.
const navLinkEls: (HTMLElement | null)[] = []
const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const setNavLinkRef = (el: unknown, index: number) => {
  navLinkEls[index] = el as HTMLElement | null
}

const updateIndicator = () => {
  const activeIndex = navItems.findIndex((item) => isSectionActive(item.href))
  const el = navLinkEls[activeIndex]
  if (el) {
    // Inset from the link's own padding (px-4 = 16px) so the line sits under the label only.
    indicatorLeft.value = el.offsetLeft + 16
    indicatorWidth.value = el.offsetWidth - 32
  }
}

watch(activeSection, () => {
  nextTick(updateIndicator)
})

onMounted(() => {
  nextTick(updateIndicator)
  window.addEventListener('resize', updateIndicator)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator)
})

const handleMobileClick = (sectionId: string) => {
  scrollToSection(sectionId)
  isMenuOpen.value = false
}
</script>
