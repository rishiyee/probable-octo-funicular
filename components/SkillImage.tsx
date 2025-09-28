"use client";

type SkillMediaProps = {
  src?: string;
};

export default function SkillMedia({ src = "/skills.gif" }: SkillMediaProps) {
  const isVideo = src.toLowerCase().endsWith(".mp4") || src.toLowerCase().endsWith(".webm");
  return (
    <div className="w-[20vw] aspect-[3/4] relative overflow-hidden">
      {isVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <img
          src={src}
          alt="Skill media"
          className="object-cover w-full h-full rounded-lg"
        />
      )}
    </div>
  );
}
