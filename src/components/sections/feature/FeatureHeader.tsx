import { Leaf } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";

interface FeatureHeaderProps {
  heading?: string; // Used as Eyebrow
  intro?: string; // Used as Main Title
  note?: string; // Used as Description underneath
}

export function FeatureHeader({ heading, intro, note }: FeatureHeaderProps) {
  return (
    <SectionReveal>
      <div className="text-center mb-10 flex flex-col items-center">
        {/* Eyebrow */}
        {heading && (
          <span className="text-[#C5A97A] text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-semibold">
            {heading}
          </span>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-4 opacity-70">
          <div className="h-px w-8 bg-[#A18866]" />
          <Leaf className="w-4 h-4 text-[#C5A97A]" strokeWidth={1.5} />
          <div className="h-px w-8 bg-[#A18866]" />
        </div>

        {/* Main Title */}
        {intro && (
          <h2 className="font-display text-[28px] md:text-36px] text-[#111] font-semibold mb-4">
            {intro}
          </h2>
        )}
      </div>
    </SectionReveal>
  );
}
