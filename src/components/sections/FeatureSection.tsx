import { FeatureHeader } from "./feature/FeatureHeader";
import { FeatureFooter } from "./feature/FeatureFooter";
import { FeatureCard } from "../cards/FeatureCard";
import type { FeatureGroup } from "@/types/components"; // adjust import as needed

interface FeatureSectionProps {
  featureGroup?: FeatureGroup | null;
}

export function FeatureSection({ featureGroup }: FeatureSectionProps) {
  if (!featureGroup || !featureGroup.items || featureGroup.items.length === 0) {
    return null;
  }

  // Ensure items are mapped by sort_order
  const sortedItems = [...featureGroup.items].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return (
    <section className="bg-[#F6F4F0] py-16 md:py-20 overflow-hidden">
      <div className="w-[92%] max-w-[1150px] mx-auto">
        <FeatureHeader
          heading={featureGroup.heading}
          intro={featureGroup.intro}
          note={featureGroup.note}
        />

        {/* 
          Grid Layout:
          Mobile: 1 column
          Tablet (md): 2 columns
          Desktop (lg): 4 columns
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {sortedItems.map((item) => (
            <FeatureCard key={item.slug} item={item} />
          ))}
        </div>

        <FeatureFooter quote={featureGroup.quote} stats={featureGroup.stats} />
      </div>
    </section>
  );
}
