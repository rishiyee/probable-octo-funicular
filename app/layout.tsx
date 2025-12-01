import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

// Add Host Grotesk font
const hostGrotesk = localFont({
  src: [
    { path: '../public/fonts/HostGrotesk-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/HostGrotesk-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/HostGrotesk-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/HostGrotesk-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-host-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'rishiyee',
  description: 'Minimal starter with Tailwind and Host Grotesk font',
  icons: {
    icon: '/faviconfff.svg',
    shortcut: '/faviconfff.svg',
    apple: '/faviconfff.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hostGrotesk.variable}>
      <head>
        {/* Material Symbols Rounded (cleanest Material icons) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
          rel="stylesheet"
        />
      </head>

      <body className="host-grotesk bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
