<template>
  <div class="particle-container">
    <canvas ref="canvas" class="particle-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number | null = null
let particles: Particle[] = []
let mousePosition = { x: 0, y: 0 }
let isMouseInCanvas = false

// Particle class
class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.size = 2
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
  }

  update(width: number, height: number) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx
    }
    if (this.y < 0 || this.y > height) {
      this.vy = -this.vy
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(59, 130, 246, 0.7)' // Blue
    ctx.fill()
  }
}

// Initialize particles
const initParticles = () => {
  if (!canvas.value || !ctx) return

  const width = canvas.value.width
  const height = canvas.value.height

  particles = []

  for (let i = 0; i < 80; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    particles.push(new Particle(x, y))
  }
}

// Draw connections between particles
const drawConnections = () => {
  if (!ctx || !canvas.value) return

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        const opacity = 1 - (distance / 150)
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // Draw connections to mouse if it's in the canvas
    if (isMouseInCanvas) {
      const dx = particles[i].x - mousePosition.x
      const dy = particles[i].y - mousePosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 200) {
        const opacity = 1 - (distance / 200)
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(mousePosition.x, mousePosition.y)
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})` // Increased opacity for better visibility
        ctx.lineWidth = 1.5 // Slightly thicker lines
        ctx.stroke()
      }
    }
  }
}

// Animation loop
const animate = () => {
  if (!canvas.value || !ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  particles.forEach(particle => {
    particle.update(canvas.value!.width, canvas.value!.height)
    particle.draw(ctx!)
  })

  drawConnections()

  animationFrameId = requestAnimationFrame(animate)
}

// Resize canvas to match window
const resizeCanvas = () => {
  if (!canvas.value) return

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  initParticles()
}

// Mouse event handlers
const handleMouseMove = (e: MouseEvent) => {
  if (!canvas.value) return

  // For window-level mouse tracking, we need to use the raw coordinates
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  }

  // Always consider mouse in canvas when it moves anywhere in the window
  isMouseInCanvas = true
}

// We're tracking mouse globally, so we don't need separate enter/leave handlers

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')

    // Set initial canvas size
    resizeCanvas()

    // Start animation
    animate()

    // Add event listeners
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    // We're not using these anymore as we're tracking mouse globally
    // canvas.value.addEventListener('mouseenter', handleMouseEnter)
    // canvas.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)

  // We're not using these anymore
  // if (canvas.value) {
  //   canvas.value.removeEventListener('mouseenter', handleMouseEnter)
  //   canvas.value.removeEventListener('mouseleave', handleMouseLeave)
  // }
})
</script>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5; /* Higher than 0 but still behind content (z-index: 10) */
}

.particle-canvas {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
