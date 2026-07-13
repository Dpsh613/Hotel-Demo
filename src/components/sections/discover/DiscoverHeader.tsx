import { Flower2 } from "lucide-react";

interface DiscoverHeaderProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
}

export function DiscoverHeader({
  eyebrow,
  heading,
  intro,
}: DiscoverHeaderProps) {
  return (
    <div className="text-center max-w-[800px] mx-auto mb-16">
      {eyebrow && (
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-[#C5A97A]/50" />
          <Flower2 className="w-4 h-4 text-[#C5A97A]" strokeWidth={1} />
          <span className="text-[12px] tracking-[0.2em] font-semibold uppercase text-[#C5A97A]">
            {eyebrow}
          </span>
          <Flower2 className="w-4 h-4 text-[#C5A97A]" strokeWidth={1} />
          <div className="h-[1px] w-8 bg-[#C5A97A]/50" />
        </div>
      )}

      {heading && (
        <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[56px] text-[#111] leading-[1.1] mb-6">
          {heading}
        </h2>
      )}

      {intro && (
        <p className="text-[16px] text-[#666] leading-relaxed max-w-[700px] mx-auto">
          {intro}
        </p>
      )}
    </div>
  );
}
