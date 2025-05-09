<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-900 py-4 px-6 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo or Site Title -->
      <a
        href="#home"
        @click.prevent="scrollToSection('#home')"
        class="text-white font-semibold flex items-center"
      >
        <div
          class="w-8 h-8 rounded-full overflow-hidden mr-2 transition-all duration-300"
          :class="[
            isHeroHalfwayScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            'transform',
          ]"
        >
          <img src="/me.jpg" alt="Amelito N. Alcuitas Jr." class="w-full h-full object-cover" />
        </div>
        <span
          class="text-xl transition-all duration-300 text-blue-500"
          :class="[
            isHeroHalfwayScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            'transform',
          ]"
          >Amelitz</span
        >
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        <a
          v-for="(item, index) in navItems"
          :key="index"
          :href="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer relative py-1"
          :class="{ 'nav-active': isSectionActive(item.href) }"
        >
          {{ item.name }}
          <span
            class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300"
            :class="{ 'scale-x-100': isSectionActive(item.href) }"
          ></span>
        </a>
      </div>
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition
      name="menu"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-show="isMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-lg py-4 px-6"
      >
        <!-- Mobile Navigation -->
        <div class="flex flex-col space-y-4">
          <a
            v-for="(item, index) in navItems"
            :key="index"
            :href="item.href"
            class="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer relative pl-3"
            :class="{ 'nav-active': isSectionActive(item.href) }"
            @click.prevent="handleMobileClick(item.href)"
          >
            <span
              class="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 transform scale-y-0 transition-transform duration-300"
              :class="{ 'scale-y-100': isSectionActive(item.href) }"
            ></span>
            {{ item.name }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

// Use the active section composable
const { isSectionActive } = useActiveSection()

// Use the hero scroll tracker composable
const { isHeroHalfwayScrolled } = useHeroScrollTracker()

// Function to handle mobile menu clicks
const handleMobileClick = (sectionId: string) => {
  scrollToSection(sectionId)
  isMenuOpen.value = false
}
</script>

<style scoped>
.nav-active {
  color: white;
  font-weight: 500;
}
</style>
