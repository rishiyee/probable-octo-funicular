"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        px-[18px] py-[14px]
        gap-[4px]
        rounded-full
        bg-[#FC5F2B]
        text-white text-[14px] font-medium
        sf-pro
        transition-all duration-200
        hover:opacity-90 active:scale-[0.98]
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
}
