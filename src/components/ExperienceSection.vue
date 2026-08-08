<template>
  <section id="experience" class="relative py-32 px-6" ref="target">
    <div class="container mx-auto">
      <p class="section-eyebrow mb-4 reveal" :class="{ 'is-visible': visible }">03 &mdash; Experience</p>
      <h2
        class="section-heading text-4xl md:text-6xl font-semibold mb-16 reveal"
        :class="{ 'is-visible': visible }"
      >
        Where I've <span class="italic text-accent-400">worked</span>
      </h2>

      <div class="max-w-5xl border-t border-white/[0.08]">
        <div
          v-for="(experience, index) in experiences"
          :key="experience.title + experience.company"
          class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-white/[0.08] reveal"
          :class="{ 'is-visible': visible }"
          :style="{ transitionDelay: `${index * 120}ms` }"
        >
          <div class="md:col-span-3">
            <span class="font-mono text-sm text-mist-400">{{ experience.period }}</span>
          </div>

          <div class="md:col-span-9">
            <h3 class="font-heading text-2xl md:text-3xl font-medium text-mist-100">{{ experience.title }}</h3>
            <h4 class="text-accent-400 mt-1 mb-5">{{ experience.company }}</h4>

            <ul class="space-y-2.5 text-mist-400">
              <li v-for="(responsibility, rIndex) in experience.responsibilities" :key="rIndex" class="flex gap-3">
                <span class="mt-2.5 h-1 w-1 rounded-full bg-mist-400 flex-shrink-0"></span>
                <span>{{ responsibility }}</span>
              </li>
            </ul>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="(tech, tIndex) in experience.technologies"
                :key="tIndex"
                class="px-3 py-1 border border-white/10 text-mist-200 rounded-full text-xs font-mono"
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
import { useReveal } from '@/composables/useReveal'

const { target, visible } = useReveal()

const experiences = [
  {
    title: 'Full Stack Web Developer',
    company: 'Lanex Corporation',
    period: '2021 — Present',
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
    period: '2019 — 2020',
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
    period: '2017 — 2018',
    responsibilities: [
      'Developed full-stack applications and integrated back-end APIs.',
      'Wrote clean, scalable code for both front-end and back-end components.',
      'Used modern frameworks to enhance software functionality and UX.',
      'Maintained and updated legacy systems for improved stability and performance.',
    ],
    technologies: ['JavaScript', 'jQuery', 'PHP', 'Laravel', 'MySQL'],
  },
]
</script>
