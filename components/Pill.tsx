type PillProps = {
  children: React.ReactNode;
  variant?: "default" | "filled" | "glass" | "outlineDark";
  size?: "sm" | "md" | "lg";
};

export default function Pill({
  children,
  variant = "default",
  size = "md",
}: PillProps) {
  const baseStyles = `
    inline-flex
    justify-center
    items-center
    gap-[4px]
    rounded-[84px]
    font-[510]
    sf-pro
    transition-all
    duration-200
  `;

  const sizeStyles = {
    sm: `
      px-3 py-1
      text-[12px]
      tracking-[-0.24px]
    `,
    md: `
      px-[12px] py-[6px]
      text-[14px]
      tracking-[-0.28px]
    `,
    lg: `
      px-5 py-2
      text-[20px]
      tracking-[-0.32px]
    `,
  };

  const variants = {
    default: `
      border border-white/90
      text-white
      hover:border-white
    `,
    filled: `
      bg-white
      text-black
      border border-white
      hover:bg-white/90
    `,
    glass: `
      border border-white/40
      text-white
      backdrop-blur-md
      bg-white/10
      hover:bg-white/20
    `,
    outlineDark: `
      border border-[#4D4D4D]
      text-[#878787]
    `,
  };

  return (
    <div className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]}`}>
      {children}
    </div>
  );
}
