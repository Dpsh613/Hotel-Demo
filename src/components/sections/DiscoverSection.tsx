import { DiscoverHeader } from "./discover/DiscoverHeader";
import { DiscoverFooterCTA } from "./discover/DiscoverFooterCTA";
import { DiscoverCard } from "../cards/DiscoverCard";
import type { DiscoverSection as DiscoverSectionType } from "@/types/components";

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
    <section className="bg-[#F6F4F0]pb-12 md:pb-[30px] overflow-hidden">
      {/* 1. RESTRICTED WIDTH CONTAINER FOR LARGER MARGINS */}
      <div className="w-[92%] max-w-[1150px] mx-auto">
        <DiscoverHeader
          eyebrow={data.eyebrow}
          heading={data.heading}
          intro={data.intro}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4">
          {/* LEFT COLUMN (Landscape Cards) */}
          <div className="lg:col-span-7 flex flex-col gap-3 lg:gap-6">
            {leftColumnItems.map(({ item, originalIndex }) => (
              <div
                key={item.slug}
                className="w-full h-[300px] md:h-[320px] flex"
              >
                <DiscoverCard
                  item={item}
                  originalIndex={originalIndex}
                  variant="landscape"
                />
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN (Square Cards) */}
          {/* Using a slightly smaller height creates the staggered masonry effect */}
          <div className="lg:col-span-5 flex flex-col gap-2 lg:gap-4">
            {rightColumnItems.map(({ item, originalIndex }) => (
              <div
                key={item.slug}
                className="w-full min-h-[260px] md:h-[280px] flex"
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

        <DiscoverFooterCTA />
      </div>
    </section>
  );
}
