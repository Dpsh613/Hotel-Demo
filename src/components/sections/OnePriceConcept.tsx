import Image from "next/image";
import { SectionReveal } from "@/components/animation/SectionReveal";

interface OnePriceConceptProps {
  headline: string;
  body: string;
  inclusionsHeading?: string;
  inclusionsBody?: string;
  cateringNote?: string | null;
  supportingImageRef?: string | null;
  supportingImageAlt?: string;
  background?: "default" | "alternate"; // Kept for prop compatibility, though background is hardcoded to #F0EDE8
  showTailoredSection?: boolean;
}

export function OnePriceConcept({
  headline,
  body,
  inclusionsHeading,
  inclusionsBody,
  cateringNote,
  supportingImageRef,
  supportingImageAlt,
  showTailoredSection = true,
}: OnePriceConceptProps) {
  const imageRef =
    supportingImageRef || "/images/spaces/one-price-tailored.jpg";

  return (
    <section
      id="one-price-concept"
      className="relative bg-[#F0EDE8] py-[80px] flex flex-col items-center gap-[24px] scroll-mt-24"
    >
      {/* Gradient Fade Overlay - adjust h-[150px] to control fade distance */}
      <div className="absolute top-0 left-0 w-full h-[70px] bg-gradient-to-b from-[#FFFFFF] to-transparent pointer-events-none" />

      <div className="container-content relative z-10 w-full flex flex-col items-center">
        {!showTailoredSection ? (
          /* Text-Only Mode Panel */
          <SectionReveal
            direction="up"
            delay={0}
            className="w-full max-w-[950px]"
          >
            <div className="bg-[#FFFFFF] rounded-[8px] px-[24px] py-[64px] md:px-[60px] md:py-[56px] w-full mx-auto text-center shadow-sm">
              <h2 className="font-display text-[36px] text-[#111] font-semibold text-center">
                {headline}
              </h2>
              <p className="text-[16px] text-[#555] leading-[1.6] text-center mt-6 max-w-[600px] mx-auto">
                {body}
              </p>
              {inclusionsBody && (
                <p className="text-[16px] text-[#555] leading-[1.6] text-center mt-6 max-w-[600px] mx-auto">
                  {inclusionsBody}
                </p>
              )}
              {cateringNote && (
                <p className="text-[16px] text-[#555] leading-[1.6] text-center mt-6 max-w-[600px] mx-auto">
                  {cateringNote}
                </p>
              )}
            </div>
          </SectionReveal>
        ) : (
          /* Two-Panel Mode (Meeting Spaces) */
          <div className="flex flex-col gap-[48px] w-full max-w-[950px] mx-auto">
            {/* Panel 1 — One Price Concept */}
            <SectionReveal direction="up" delay={0}>
              <div className="bg-[#FFFFFF] rounded-[8px] px-[24px] py-[64px] md:px-[60px] md:py-[56px] text-center shadow-sm">
                <h2 className="font-display text-[36px] text-[#111] font-semibold text-center">
                  {headline}
                </h2>
                <p className="text-[16px] text-[#555] leading-[1.6] text-center mt-6 max-w-[500px] mx-auto">
                  {body}
                </p>
              </div>
            </SectionReveal>

            {/* Panel 2 — Tailored to Your Business Needs */}
            <SectionReveal direction="up" delay={0.1}>
              <div className="bg-[#FFFFFF] rounded-[8px] p-[24px] md:p-[40px] shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-[40px] md:gap-[60px] items-center justify-center">
                  {/* Left: Image */}
                  <div className="relative aspect-[3/4] rounded-[8px] overflow-hidden bg-gray-100">
                    <Image
                      src={imageRef}
                      alt={supportingImageAlt || inclusionsHeading || ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 240px, 100vw"
                    />
                  </div>

                  {/* Right: Text */}
                  <div>
                    {inclusionsHeading && (
                      <h3 className="font-display text-[36px] text-[#111] font-semibold">
                        {inclusionsHeading}
                      </h3>
                    )}
                    {inclusionsBody && (
                      <p className="text-[16px] text-[#555] leading-relaxed mt-3">
                        {inclusionsBody}
                      </p>
                    )}

                    {cateringNote && (
                      <p className="text-[12px] italic text-[#888] mt-4 pt-4 border-t border-[#E8E4DC]">
                        {cateringNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        )}
      </div>
    </section>
  );
}
