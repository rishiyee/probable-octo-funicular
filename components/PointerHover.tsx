export default function PointerHover({ icon = "north_east" }) {
  return (
    <div
      className="
        inline-flex items-center gap-1
        p-4 rounded-[72px] bg-white
        transition-all cursor-pointer
        hover:shadow-md hover:-translate-y-0.5
      "
    >
      <span className="material-symbols-rounded text-[24px]">
        {icon}
      </span>
    </div>
  );
}
