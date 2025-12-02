import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-full
        text-sm font-medium
        bg-red-500 text-white
        hover:bg-neutral-100 hover:text-black
        transition
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
