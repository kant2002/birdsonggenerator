import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', 'sound/**'],
    },
  },
})
