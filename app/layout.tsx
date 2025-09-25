import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'

// Add Host Grotesk font with TTF only
const hostGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/HostGrotesk-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/HostGrotesk-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/HostGrotesk-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/HostGrotesk-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-host-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nextjs Starter',
  description: 'Minimal starter with Tailwind and Host Grotesk font',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={hostGrotesk.variable}>
      <body className="host-grotesk bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
