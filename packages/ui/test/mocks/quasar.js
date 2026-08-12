export const QBtn = { name: 'QBtn' }
export const QTooltip = { name: 'QTooltip' }

import { vi } from 'vitest'

export const copyToClipboard = vi.fn(() => Promise.resolve())

export const notify = vi.fn()

export function useQuasar() {
  return {
    dark: {
      isActive: false,
    },
    notify,
  }
}
