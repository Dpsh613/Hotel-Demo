import { SectionReveal } from "@/components/animation/SectionReveal";
import { FeatureGroup } from "@/types/components";
import * as LucideIcons from "lucide-react";

interface WhatsIncludedSectionProps {
  inclusions: FeatureGroup;
}

export function WhatsIncludedSection({
  inclusions,
}: WhatsIncludedSectionProps) {
  if (!inclusions || inclusions.items.length === 0) return null;

  return (
    <section
      id="whats-included"
      className="bg-[#F0EDE8] pb-[40px] md:pb-[80px] flex justify-center scroll-mt-24"
    >
      <div className="container-content w-full flex justify-center">
        <SectionReveal direction="up" className="w-full max-w-[950px]">
          <div className="bg-[#FFFFFF] rounded-[8px] px-[24px] py-[64px] md:px-[60px] md:py-[56px] w-full shadow-sm text-center">
            <h2 className="font-display text-[36px] text-[#111] font-semibold text-center mb-6">
              {inclusions.heading || "What's Included"}
            </h2>
            {inclusions.intro && (
              <p className="text-[16px] text-[#555] leading-[1.6] text-center max-w-[600px] mx-auto mb-10">
                {inclusions.intro}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] text-left ">
              {inclusions.items.map((item, index) => {
                const IconComponent =
                  item.icon_ref && (LucideIcons as any)[item.icon_ref]
                    ? (LucideIcons as any)[item.icon_ref]
                    : null;

                return (
                  <div
                    key={item.slug || index}
                    className="border border-[#E8E4DC] rounded-[6px] py-[16px] px-[20px] flex flex-col gap-[4px] bg-[#F5F5F5]"
                  >
                    <div className="flex items-center gap-[8px]">
                      {IconComponent && (
                        <IconComponent className="size-4 text-[#888]" />
                      )}
                      <span className="text-[15px] font-semibold text-[#111]">
                        {item.label}
                      </span>
                    </div>
                    {item.body && (
                      <p className="text-[13px] text-[#666] leading-snug">
                        {item.body}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
