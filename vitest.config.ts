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
      // --no-webstorage removes Node's accessors so jsdom's Storage installs.
      execArgv: ['--no-webstorage'],
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
