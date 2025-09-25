'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from './button'
import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
      {isDark ? 'Light' : 'Dark'}
    </Button>
  )
}
