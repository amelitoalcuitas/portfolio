import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Reveals an element once it scrolls into the viewport, via IntersectionObserver.
 * Bind `target` to the element and toggle the `.is-visible` class (paired with
 * the `.reveal` utility class in style.css) based on `visible`.
 */
export function useReveal(options: { threshold?: number; once?: boolean } = {}) {
  const { threshold = 0.2, once = true } = options

  const target = ref<HTMLElement | null>(null)
  const visible = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible.value = true
          if (once && target.value && observer) {
            observer.unobserve(target.value)
          }
        } else if (!once) {
          visible.value = false
        }
      },
      { threshold },
    )

    if (target.value) {
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }
    observer = null
  })

  return { target, visible }
}
