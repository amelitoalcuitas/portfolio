<template>
  <section id="about" class="relative py-32 px-6" ref="target">
    <div class="container mx-auto">
      <p class="section-eyebrow mb-4 reveal" :class="{ 'is-visible': visible }">01 &mdash; About</p>
      <h2
        class="section-heading text-4xl md:text-6xl font-semibold mb-16 reveal"
        :class="{ 'is-visible': visible }"
      >
        Who I <span class="italic text-accent-400">am</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <!-- Pull-quote intro -->
        <div class="md:col-span-7">
          <p
            class="font-heading text-2xl md:text-3xl leading-snug text-mist-100 reveal"
            :class="{ 'is-visible': visible }"
            style="transition-delay: 100ms"
          >
            I'm <span class="text-accent-400">Amelito N. Alcuitas Jr.</span> &mdash; friends call
            me <span class="italic">Amelitz</span> or <span class="italic">Mel</span>. A full
            stack developer and AI enthusiast focused on building efficient, scalable,
            user-friendly web applications.
          </p>
          <p
            class="mt-6 text-mist-400 leading-relaxed reveal"
            :class="{ 'is-visible': visible }"
            style="transition-delay: 200ms"
          >
            I believe in writing clean, maintainable code that solves real problems &mdash;
            balancing technical excellence with user experience and business goals. I'm based in
            Cebu City, Philippines, and work remotely with clients and teams around the world.
          </p>

          <ul class="mt-10 space-y-3">
            <li
              v-for="(item, index) in whatIDo"
              :key="item"
              class="flex items-start gap-3 text-mist-200 reveal"
              :class="{ 'is-visible': visible }"
              :style="{ transitionDelay: `${300 + index * 80}ms` }"
            >
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-accent-400 flex-shrink-0"></span>
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Metrics strip -->
        <div class="md:col-span-5 flex flex-col justify-center gap-8 md:border-l md:border-white/[0.08] md:pl-16">
          <div
            v-for="(metric, index) in metrics"
            :key="metric.label"
            class="reveal"
            :class="{ 'is-visible': visible }"
            :style="{ transitionDelay: `${400 + index * 100}ms` }"
          >
            <div class="font-heading text-5xl md:text-6xl font-semibold text-gradient leading-none">
              {{ metric.value }}
            </div>
            <div class="mt-2 text-sm text-mist-400 uppercase tracking-wide font-mono">
              {{ metric.label }}
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

const whatIDo = [
  'Develop full-stack web and mobile applications',
  'Optimize application performance and user experience',
  'Collaborate with teams to deliver high-quality software',
  'Integrate third-party APIs and services',
]

const metrics = [
  { value: '5+', label: 'Years experience' },
  { value: '4', label: 'Products shipped' },
  { value: '15+', label: 'Technologies' },
]
</script>
