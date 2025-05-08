<template>
  <div class="min-h-screen bg-gray-900 text-white relative">
    <!-- Global animated background -->
    <SimpleParticleBackground />

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
</script>
