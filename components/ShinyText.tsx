const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  size = "text-[32px]", 
  className = "",
}) => {
  return (
    <div
      className={[
        "text-[#b5b5b5a4] bg-clip-text inline-block",
        size,
        !disabled && "animate-shine",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
