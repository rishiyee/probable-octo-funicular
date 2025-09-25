import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nextjs Starter',
  description: 'Minimal starter with Tailwind, Space Grotesk, and shadcn/ui components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
