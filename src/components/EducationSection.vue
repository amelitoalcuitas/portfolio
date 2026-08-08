<template>
  <section id="education" class="relative py-32 px-6" ref="target">
    <div class="container mx-auto">
      <p class="section-eyebrow mb-4 reveal" :class="{ 'is-visible': visible }">02 &mdash; Education</p>
      <h2
        class="section-heading text-4xl md:text-6xl font-semibold mb-16 reveal"
        :class="{ 'is-visible': visible }"
      >
        Where I <span class="italic text-accent-400">started</span>
      </h2>

      <div
        class="max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-y border-white/[0.08] reveal"
        :class="{ 'is-visible': visible }"
        style="transition-delay: 100ms"
      >
        <div class="md:col-span-3">
          <span class="font-mono text-sm text-mist-400">2012 — 2017</span>
        </div>

        <div class="md:col-span-9">
          <h3 class="font-heading text-2xl md:text-3xl font-medium text-mist-100 leading-tight">
            Bachelor of Science in Information and Communications Technology
          </h3>
          <h4 class="text-accent-400 mt-1 mb-5">University of San Carlos</h4>

          <p class="text-mist-400 leading-relaxed max-w-2xl">
            A comprehensive program covering software development, database management,
            networking, and systems analysis &mdash; grounding both the theory and the practical
            application of information technology.
          </p>

          <div class="mt-6 flex items-center gap-3 text-sm text-mist-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            Dean's Lister, A.Y. 2015–2016 &amp; A.Y. 2016–2017
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'

const { target, visible } = useReveal()
</script>
