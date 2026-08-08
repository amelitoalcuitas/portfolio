<template>
  <section id="skills" class="relative py-32 px-6" ref="target">
    <div class="container mx-auto">
      <p class="section-eyebrow mb-4 reveal" :class="{ 'is-visible': visible }">05 &mdash; Skills</p>
      <h2
        class="section-heading text-4xl md:text-6xl font-semibold mb-16 reveal"
        :class="{ 'is-visible': visible }"
      >
        Tools of the <span class="italic text-accent-400">trade</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
        <div
          v-for="(group, groupIndex) in skillGroups"
          :key="group.title"
          class="reveal"
          :class="{ 'is-visible': visible }"
          :style="{ transitionDelay: `${groupIndex * 120}ms` }"
        >
          <h3 class="font-mono text-xs uppercase tracking-widest text-mist-400 mb-6 pb-4 border-b border-white/[0.08]">
            {{ group.title }}
          </h3>
          <ul class="flex flex-col divide-y divide-white/[0.06]">
            <li
              v-for="skill in group.skills"
              :key="skill.name"
              class="flex items-center justify-between py-3.5 group"
            >
              <span class="text-mist-100 group-hover:text-mist-100 transition-colors">{{ skill.name }}</span>
              <span class="flex items-center gap-2">
                <span class="hidden sm:inline text-xs text-mist-400 font-mono">{{ skill.level }}</span>
                <span class="flex gap-1">
                  <span
                    v-for="dot in 4"
                    :key="dot"
                    class="h-1.5 w-1.5 rounded-full transition-colors"
                    :class="dot <= skill.rating ? 'bg-accent-400' : 'bg-white/10'"
                  ></span>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'

const { target, visible } = useReveal()

const skillGroups = [
  {
    title: 'Front-End',
    skills: [
      { name: 'HTML/CSS', level: 'Expert', rating: 4 },
      { name: 'JavaScript/TypeScript', level: 'Expert', rating: 4 },
      { name: 'Vue.js', level: 'Expert', rating: 4 },
      { name: 'React', level: 'Intermediate', rating: 2 },
      { name: 'Flutter', level: 'Advanced', rating: 3 },
    ],
  },
  {
    title: 'Back-End',
    skills: [
      { name: 'Node.js', level: 'Advanced', rating: 3 },
      { name: 'Express.js', level: 'Advanced', rating: 3 },
      { name: 'Laravel', level: 'Basic', rating: 1 },
      { name: 'PHP', level: 'Basic', rating: 1 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', level: 'Advanced', rating: 3 },
      { name: 'MySQL', level: 'Advanced', rating: 3 },
      { name: 'PostgreSQL', level: 'Intermediate', rating: 2 },
      { name: 'Firebase', level: 'Advanced', rating: 3 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 'Advanced', rating: 3 },
      { name: 'Docker', level: 'Basic', rating: 1 },
      { name: 'Postman', level: 'Advanced', rating: 3 },
      { name: 'VS Code', level: 'Expert', rating: 4 },
      { name: 'AI Tools', level: 'Advanced', rating: 3 },
    ],
  },
]
</script>
