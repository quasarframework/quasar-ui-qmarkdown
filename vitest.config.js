import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      quasar: fileURLToPath(new URL('./packages/ui/test/mocks/quasar.js', import.meta.url)),
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: ['packages/ui/src/version.js'],
      include: ['packages/ui/src/**/*.{js,ts}'],
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
})
