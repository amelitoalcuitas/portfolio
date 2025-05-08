import { ref, onBeforeUnmount } from 'vue'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

export interface Project {
  title: string
  description: string
  images: string[]
  technologies: string[]
}

export function useImageViewer(projects: Project[], onPauseAutoplay: () => void, onResumeAutoplay: () => void) {
  // ViewerJS reference
  const galleryRef = ref<HTMLElement | null>(null)
  let viewer: Viewer | null = null

  // Function to open image viewer with ViewerJS
  const openImageViewer = (projectIndex: number, imageIndex: number) => {
    // Pause autoplay
    onPauseAutoplay()

    // Initialize viewer if not already done
    if (!viewer && galleryRef.value) {
      viewer = new Viewer(galleryRef.value, {
        inline: false,
        navbar: true,
        title: false,
        toolbar: false,
        keyboard: true,
        movable: true,
        rotatable: true,
        scalable: true,
        zoomable: true,
        zoomOnTouch: true,
        zoomOnWheel: true,
        toggleOnDblclick: true,
        tooltip: true,
        transition: true,
        fullscreen: true,
        viewed() {
          // Resume autoplay when viewer is closed
          document.addEventListener('hidden.viewer', () => {
            onResumeAutoplay()
          })
        },
      })
    }

    // Calculate the overall index based on project and image indices
    let overallIndex = 0
    for (let i = 0; i < projectIndex; i++) {
      overallIndex += projects[i].images.length
    }
    overallIndex += imageIndex

    // Show the viewer at the specified index
    if (viewer) {
      viewer.show()
      viewer.view(overallIndex)
    }
  }

  // Clean up function
  const cleanupViewer = () => {
    if (viewer) {
      viewer.destroy()
    }
    document.removeEventListener('hidden.viewer', onResumeAutoplay)
  }

  // Set up cleanup on component unmount
  onBeforeUnmount(cleanupViewer)

  return {
    galleryRef,
    openImageViewer,
    cleanupViewer
  }
}
