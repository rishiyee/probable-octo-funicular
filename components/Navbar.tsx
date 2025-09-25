'use client'
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-[80px] px-8 ">
      
      {/* Left Logo */}
      <div className="text-2xl font-bold text-[#5846FB]">
        Logo
      </div>

      {/* Center Menu */}
      <ul className={`flex gap-0 ${spaceGrotesk.className}`}>
        <li className="px-3 py-0 cursor-pointer hover:text-[#5846FB] transition">
          Learn
        </li>
        <li className="px-3 py-0 cursor-pointer hover:text-[#5846FB] transition">
          Build
        </li>
        <li className="px-3 py-0 cursor-pointer hover:text-[#5846FB] transition">
          Explore
        </li>
      </ul>

      {/* Right Button */}
      <button
        className={`${spaceGrotesk.className} text-[32px] px-6 py-2 bg-[#5846FB] text-white rounded-full hover:opacity-90 transition`}
      >
        Join Now
      </button>
    </nav>
  );
}
