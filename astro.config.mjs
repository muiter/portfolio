import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://muiter.github.io',
  base: '/portfolio',
  outDir: './docs',
  integrations: [react()],
  server: {
    port: 3000,
    open: true
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
