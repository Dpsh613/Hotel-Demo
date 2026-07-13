import { DiscoverHeader } from "./discover/DiscoverHeader";
import { DiscoverFooterCTA } from "./discover/DiscoverFooterCTA";
import { DiscoverCard } from "../cards/DiscoverCard";
import type { DiscoverSection as DiscoverSectionType } from "@/types/components";
import { SectionReveal } from "../animation/SectionReveal";

interface DiscoverSectionProps {
  data?: DiscoverSectionType | null;
}

export function DiscoverSection({ data }: DiscoverSectionProps) {
  if (!data || !data.items || data.items.length === 0) return null;

  const mappedItems = [...data.items]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item, index) => ({ item, originalIndex: index }));

  // Evens (0, 2, 4) go left, Odds (1, 3, 5) go right
  const leftColumnItems = mappedItems.filter((_, i) => i % 2 === 0);
  const rightColumnItems = mappedItems.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-[#F6F4F0]  py-12 md:py-[80px] overflow-hidden">
      <div className="w-[92%] max-w-[1150px] mx-auto">
        <SectionReveal>
          <DiscoverHeader
            eyebrow={data.eyebrow}
            heading={data.heading}
            intro={data.intro}
          />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* LEFT COLUMN (Landscape Cards - Wider but shorter) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6">
            {leftColumnItems.map(({ item, originalIndex }) => (
              <div
                key={item.slug}
                // Reduced height here so they look like panoramic landscape cards
                className="w-full flex h-[240px] md:h-[260px] lg:h-[280px]"
              >
                <DiscoverCard
                  item={item}
                  originalIndex={originalIndex}
                  variant="landscape"
                />
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN (Square Cards - Narrower but taller to stagger) */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-6 mt-6 lg:mt-0">
            {rightColumnItems.map(({ item, originalIndex }) => (
              <div
                key={item.slug}
                // Increased height here. Because this is taller than the left card,
                // it perfectly pushes the next rows out of alignment, creating the stagger!
                className="w-full flex h-auto md:h-[280px] lg:h-[300px]"
              >
                <DiscoverCard
                  item={item}
                  originalIndex={originalIndex}
                  variant="square"
                />
              </div>
            ))}
          </div>
        </div>
        <SectionReveal>
          <DiscoverFooterCTA />
        </SectionReveal>
      </div>
    </section>
  );
}
