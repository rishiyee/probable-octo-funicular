import Image from "next/image";
import Link from "next/link";
import Button from "./button";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center fixed top-10 left-0 z-50 sf-pro">
      <div
        className="
          flex w-full max-w-[1248px] px-6 py-3
          justify-between items-center
          rounded-full bg-[rgba(0,0,0,0.08)]
          backdrop-blur-[50px]
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/faviconfff.svg"
            alt="Logo"
            width={38}
            height={31}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* Nav links + Contact button */}
        <div className="hidden md:flex items-center gap-6 text-white text-[14px] font-medium leading-none">
          <a href="#" className="hover:opacity-70 transition">Home</a>
          <a href="#" className="hover:opacity-70 transition">Work</a>
          <a href="#" className="hover:opacity-70 transition">About</a>

          <Button>Contact</Button>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </nav>
  );
}
