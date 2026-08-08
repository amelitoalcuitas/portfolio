<template>
  <section id="contact" class="relative py-32 px-6" ref="target">
    <div class="container mx-auto">
      <p class="section-eyebrow mb-4 reveal" :class="{ 'is-visible': visible }">06 &mdash; Contact</p>
      <h2
        class="section-heading text-4xl md:text-6xl font-semibold mb-16 reveal"
        :class="{ 'is-visible': visible }"
      >
        Let's build <span class="italic text-accent-400">something</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-16 max-w-5xl">
        <!-- Contact Information -->
        <div class="md:col-span-4 reveal" :class="{ 'is-visible': visible }" style="transition-delay: 100ms">
          <p class="text-mist-400 leading-relaxed mb-10">
            Have a project in mind, or just want to say hi? My inbox is open &mdash; I try to
            reply within a day or two.
          </p>

          <ul class="space-y-6">
            <li>
              <h4 class="font-mono text-xs uppercase tracking-widest text-mist-400 mb-1.5">Email</h4>
              <a
                href="mailto:amelitoalcuitasjr@gmail.com"
                class="text-mist-100 hover:text-accent-400 transition-colors duration-300"
                >amelitoalcuitasjr@gmail.com</a
              >
            </li>
            <li>
              <h4 class="font-mono text-xs uppercase tracking-widest text-mist-400 mb-1.5">Phone</h4>
              <p class="text-mist-100">+63 999 833 5043</p>
            </li>
            <li>
              <h4 class="font-mono text-xs uppercase tracking-widest text-mist-400 mb-1.5">Location</h4>
              <p class="text-mist-100">Cebu City, Philippines</p>
            </li>
            <li>
              <h4 class="font-mono text-xs uppercase tracking-widest text-mist-400 mb-1.5">LinkedIn</h4>
              <a
                href="https://linkedin.com/in/amelitoalcuitas"
                target="_blank"
                class="text-mist-100 hover:text-accent-400 transition-colors duration-300"
                >linkedin.com/in/amelitoalcuitas</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact Form -->
        <div class="md:col-span-8 reveal" :class="{ 'is-visible': visible }" style="transition-delay: 200ms">
          <form @submit.prevent="submitForm" class="space-y-8">
            <!-- Form Status Message -->
            <div
              v-if="formStatus"
              :class="[
                'p-4 rounded-lg text-sm border',
                formStatusType === 'success'
                  ? 'bg-accent-500/10 text-accent-400 border-accent-500/30'
                  : 'bg-red-500/10 text-red-300 border-red-500/30',
              ]"
            >
              {{ formStatus }}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label for="name" class="block font-mono text-xs uppercase tracking-widest text-mist-400 mb-2"
                  >Your Name</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="w-full py-2.5 bg-transparent border-b border-white/15 focus:border-accent-400 outline-none text-mist-100 placeholder-mist-400/50 transition-colors"
                  placeholder="Juan dela Cruz"
                  required
                />
              </div>

              <div>
                <label for="email" class="block font-mono text-xs uppercase tracking-widest text-mist-400 mb-2"
                  >Your Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="w-full py-2.5 bg-transparent border-b border-white/15 focus:border-accent-400 outline-none text-mist-100 placeholder-mist-400/50 transition-colors"
                  placeholder="juandelacruz@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label for="subject" class="block font-mono text-xs uppercase tracking-widest text-mist-400 mb-2"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                class="w-full py-2.5 bg-transparent border-b border-white/15 focus:border-accent-400 outline-none text-mist-100 placeholder-mist-400/50 transition-colors"
                placeholder="Project Inquiry"
                required
              />
            </div>

            <div>
              <label for="message" class="block font-mono text-xs uppercase tracking-widest text-mist-400 mb-2"
                >Message</label
              >
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="w-full py-2.5 bg-transparent border-b border-white/15 focus:border-accent-400 outline-none text-mist-100 placeholder-mist-400/50 resize-none transition-colors"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="inline-flex items-center gap-2 px-6 py-3 bg-mist-100 text-ink-950 rounded-full font-medium text-sm transition-all duration-300 hover:bg-accent-400 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isSubmitting"
            >
              <svg
                v-if="isSubmitting"
                class="animate-spin -ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isSubmitting ? 'Sending…' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'
import { useReveal } from '@/composables/useReveal'

const { target, visible } = useReveal()

const isSubmitting = ref(false)
const formStatus = ref('')
const formStatusType = ref('')

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// EmailJS credentials from environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const submitForm = async () => {
  isSubmitting.value = true
  formStatus.value = ''
  formStatusType.value = ''

  try {
    // Prepare template parameters
    const templateParams = {
      to_email: 'amelitoalcuitasjr@gmail.com',
      from_name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      time: new Date().toLocaleString(),
    }

    // Send email using EmailJS
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

    // Reset form on success
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''

    formStatus.value = 'Thank you for your message! I will get back to you soon.'
    formStatusType.value = 'success'
  } catch (error) {
    console.error('Error sending email:', error)
    formStatus.value = 'Failed to send message. Please try again later.'
    formStatusType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
