type PillProps = {
  children: React.ReactNode;
  variant?: "default" | "filled" | "glass";
};

export default function Pill({ children, variant = "default" }: PillProps) {
  const baseStyles = `
    inline-flex
    px-3
    py-1.5
    justify-center
    items-center
    gap-1
    rounded-full
    text-[20px]
    font-[510]
    leading-none
    tracking-[-0.32px]
    sf-pro
    transition-all
    duration-200
  `;

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
  };

  return <div className={`${baseStyles} ${variants[variant]}`}>{children}</div>;
}
