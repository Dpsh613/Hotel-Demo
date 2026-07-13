import { SectionReveal } from "@/components/animation/SectionReveal";
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
    <SectionReveal>
      <div className="text-center max-w-[800px] mx-auto mb-8 md:mb-12">
        {eyebrow && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[12px] tracking-[0.2em] font-semibold uppercase text-[#C5A97A]">
              {eyebrow}
            </span>
          </div>
        )}

        {heading && (
          <h2 className="text-[28px] md:text-[36px] text-[#111] font-display font-semibold">
            {heading}
          </h2>
        )}

        {intro && (
          <p className="ttext-[14px] text-[#111] leading-relaxed font-light  mx-auto">
            {intro}
          </p>
        )}
      </div>
    </SectionReveal>
  );
}
