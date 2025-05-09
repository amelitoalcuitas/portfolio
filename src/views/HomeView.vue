<template>
  <div class="min-h-screen bg-gray-900 text-white relative">
    <!-- Global animated background -->
    <SimpleParticleBackground />

    <!-- Content with higher z-index -->
    <div class="relative z-10">
      <SiteNavigation />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDividerAlt />
      <EducationSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDividerAlt />
      <ProjectsSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDividerAlt />
      <ContactSection />
      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import SiteNavigation from '@/components/SiteNavigation.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import SimpleParticleBackground from '@/components/SimpleParticleBackground.vue'
import SectionDivider from '@/components/SectionDivider.vue'
import SectionDividerAlt from '@/components/SectionDividerAlt.vue'
import { useHashNavigation } from '@/composables/useHashNavigation'

// Initialize hash navigation
useHashNavigation()
</script>
