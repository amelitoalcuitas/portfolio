import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    // Redirect hash routes to the main page with the hash
    {
      path: '/:pathMatch(.*)*',
      redirect: to => {
        // Keep the hash if it exists
        return { path: '/', hash: to.hash }
      }
    }
  ],
  scrollBehavior(to) {
    // Don't do anything here - we'll handle scrolling in the component
    if (to.hash) {
      return false
    }
    return { top: 0 }
  }
})

export default router
