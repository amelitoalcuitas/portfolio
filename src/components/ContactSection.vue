<template>
  <section id="contact" class="py-20 px-4 min-h-screen flex items-center">
    <div class="container mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center">
        Get In <span class="text-blue-500">Touch</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <!-- Contact Information -->
        <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-6 text-white">Contact Information</h3>

          <div class="space-y-6">
            <div class="flex items-center">
              <div class="p-3 bg-blue-600 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-white mb-1">Phone</h4>
                <p class="text-gray-300">+63 999 833 5043</p>
              </div>
            </div>

            <div class="flex items-center">
              <div class="p-3 bg-blue-600 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-white mb-1">Email</h4>
                <a
                  href="mailto:amelitoalcuitasjr@gmail.com"
                  class="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >amelitoalcuitasjr@gmail.com</a
                >
              </div>
            </div>

            <div class="flex items-center">
              <div class="p-3 bg-blue-600 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-white mb-1">Location</h4>
                <p class="text-gray-300">Cebu City, Philippines</p>
              </div>
            </div>

            <div class="flex items-center">
              <div class="p-3 bg-blue-600 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-white mb-1">LinkedIn</h4>
                <a
                  href="https://linkedin.com/in/amelitoalcuitas"
                  target="_blank"
                  class="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >linkedin.com/in/amelitoalcuitas</a
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>

          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Form Status Message -->
            <div
              v-if="formStatus"
              :class="[
                'p-4 rounded-lg text-sm',
                formStatusType === 'success'
                  ? 'bg-green-800 text-green-100'
                  : 'bg-red-800 text-red-100',
              ]"
            >
              {{ formStatus }}
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-1"
                >Your Name</label
              >
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Juan dela Cruz"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-1"
                >Your Email</label
              >
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="juandelacruz@example.com"
                required
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-300 mb-1"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Project Inquiry"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-300 mb-1"
                >Message</label
              >
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
              :disabled="isSubmitting"
            >
              <svg
                v-if="isSubmitting"
                class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
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
