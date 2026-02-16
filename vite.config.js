import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get repository name from environment or use default
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'portfolio'
// Use root base path for custom domain, subpath for GitHub Pages
const base = process.env.GITHUB_PAGES && !process.env.CUSTOM_DOMAIN 
  ? `/${repositoryName}/` 
  : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
  },
})
