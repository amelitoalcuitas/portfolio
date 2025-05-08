import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

interface SwipeOptions {
  threshold?: number // Minimum distance required for a swipe (in pixels)
  restraint?: number // Maximum perpendicular movement allowed during swipe (in pixels)
  allowedTime?: number // Maximum time allowed for the swipe (in milliseconds)
}

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function useSwipe<T extends Element>(
  elementRef: Ref<T | null>,
  handlers: SwipeHandlers,
  options: SwipeOptions = {},
) {
  // Default options
  const threshold = options.threshold || 100 // Minimum distance required for a swipe
  const restraint = options.restraint || 100 // Maximum perpendicular movement allowed
  const allowedTime = options.allowedTime || 300 // Maximum time allowed for the swipe

  // Touch state variables
  let startX = 0
  let startY = 0
  let startTime = 0
  let elapsedTime = 0

  // Touch event handlers
  const handleTouchStart = (e: Event) => {
    const touchEvent = e as TouchEvent
    const touchObj = touchEvent.changedTouches[0]
    startX = touchObj.pageX
    startY = touchObj.pageY
    startTime = new Date().getTime() // Record time when finger first makes contact
  }

  const handleTouchEnd = (e: Event) => {
    const touchEvent = e as TouchEvent
    const touchObj = touchEvent.changedTouches[0]
    const distX = touchObj.pageX - startX // Get horizontal distance traveled
    const distY = touchObj.pageY - startY // Get vertical distance traveled
    elapsedTime = new Date().getTime() - startTime // Get time elapsed

    // Check that elapsed time is within specified limit,
    // horizontal distance traveled meets minimum requirement,
    // and vertical distance traveled is less than restraint
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        // If distance traveled is negative, it indicates a swipe left
        if (distX < 0 && handlers.onSwipeLeft) {
          handlers.onSwipeLeft()
        }
        // If distance traveled is positive, it indicates a swipe right
        else if (distX > 0 && handlers.onSwipeRight) {
          handlers.onSwipeRight()
        }
      }
    }
  }

  // Setup and cleanup
  onMounted(() => {
    const element = elementRef.value
    if (element) {
      element.addEventListener('touchstart', handleTouchStart, { passive: true })
      element.addEventListener('touchend', handleTouchEnd, { passive: true })
    }
  })

  onBeforeUnmount(() => {
    const element = elementRef.value
    if (element) {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  })

  return {
    // Return any values or methods that might be useful
  }
}
