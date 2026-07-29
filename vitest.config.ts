import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
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
