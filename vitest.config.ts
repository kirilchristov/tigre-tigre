import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      // Node 25+/26 ships experimental webstorage accessors on globalThis even
      // when disabled. Vitest's getWindowKeys then refuses to copy jsdom's
      // localStorage/sessionStorage (key already exists on globalThis, not in
      // its allowlist), so bare `localStorage` resolves to Node's lazy getter
      // -> undefined -> ThemeToggle crashes on render (vitest-dev/vitest#10867).
      // --no-experimental-webstorage removes Node's accessors so jsdom's
      // Storage installs. Canonical flag: effective on Node 25+/26, accepted
      // (and a no-op) on Node 22.4+/24.x — unlike --no-webstorage, which
      // Node 24 rejects and would break Vercel's Node 24 builds. Remove this
      // line once we migrate to vitest v5 (properly fixed upstream there).
      execArgv: ['--no-experimental-webstorage'],
      setupFiles: ['./src/test/setup.ts'],
      include: ['**/__tests__/**/*.test.{ts,tsx,mts}'],
      coverage: {
        provider: 'v8',
        include: [
          'src/features/promo/**/*.{ts,tsx}',
          'src/components/PageMetadata.tsx',
          'src/lib/page-metadata.ts',
          'src/components/layout/nav-items.ts',
        ],
        thresholds: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  })
)
