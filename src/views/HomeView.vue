<template>
  <div class="min-h-screen relative">
    <!-- Global ambient background -->
    <div class="ambient-bg"></div>

    <!-- Cursor-follow spotlight, tracks the mouse across the whole page -->
    <div class="pointer-events-none fixed inset-0 z-[1] hidden md:block" :style="spotlightStyle"></div>

    <!-- Content with higher z-index -->
    <div class="relative z-10">
      <SiteNavigation />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import { useHashNavigation } from '@/composables/useHashNavigation'

// Initialize hash navigation
useHashNavigation()

// Cursor-follow spotlight, tracked in viewport space so it follows the
// mouse consistently no matter which section is currently in view.
const mouseX = ref(50)
const mouseY = ref(50)

const spotlightStyle = computed(() => ({
  background: `radial-gradient(38rem 38rem at ${mouseX.value}% ${mouseY.value}%, rgba(139, 92, 246, 0.08), transparent 60%)`,
}))

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth) * 100
  mouseY.value = (e.clientY / window.innerHeight) * 100
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>
