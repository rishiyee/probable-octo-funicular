'use client'
import Link from 'next/link'
import { ModeToggle } from './ui/mode-toggle'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        MyApp
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/" className="hover:text-gray-500 dark:hover:text-gray-300">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-500 dark:hover:text-gray-300">
          About
        </Link>
        <Link href="/contact" className="hover:text-gray-500 dark:hover:text-gray-300">
          Contact
        </Link>
        <ModeToggle />
      </div>
    </nav>
  )
}
