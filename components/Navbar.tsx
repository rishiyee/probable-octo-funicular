import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center absolute top-6 left-0 z-50">
      <div
        className="
          flex w-full max-w-[1248px] px-6 py-3
          justify-between items-center
          rounded-full bg-[rgba(0,0,0,0.08)]
          backdrop-blur-[50px]
        "
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/faviconfff.svg"
            alt="Logo"
            width={38}
            height={31}
            className="object-contain"
          />
        </div>

        {/* Nav links */}
        <div className="hidden md:flex gap-6 text-white text-sm font-normal">
          <a href="#" className="hover:opacity-70 transition">Home</a>
          <a href="#" className="hover:opacity-70 transition">Work</a>
          <a href="#" className="hover:opacity-70 transition">About</a>
          <a href="#" className="hover:opacity-70 transition">Contact</a>
        </div>

        {/* Mobile */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </nav>
  );
}
