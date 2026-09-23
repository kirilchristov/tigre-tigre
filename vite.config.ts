import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
) as { version: string }

// Inject the last commit message so boot logs can surface what is deployed.
let lastCommitMessage = 'unknown'
try {
  lastCommitMessage = execSync('git log -1 --format=%s', { encoding: 'utf8' }).trim()
} catch {
  // git unavailable in the build environment: fall back to a placeholder.
}

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      renderTarget: '#root',
      additionalPrerenderRoutes: ['/promo', '/en', '/en/promo'],
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __APP_LAST_COMMIT__: JSON.stringify(lastCommitMessage),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
