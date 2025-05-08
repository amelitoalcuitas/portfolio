import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { init } from '@emailjs/browser'

// Initialize EmailJS with public key from environment variable
init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

const app = createApp(App)

app.use(router)

app.mount('#app')
