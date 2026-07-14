import { Leaf, Users, MapPin, Star, Quote } from "lucide-react";
import type { FeatureQuote, FeatureStat } from "@/types/components"; // adjust import as needed

interface FeatureFooterProps {
  quote?: FeatureQuote;
  stats?: FeatureStat[];
}

const StatIconMap: Record<string, React.ElementType> = {
  years: Leaf,
  guests: Users,
  cities: MapPin,
  rating: Star,
};

export function FeatureFooter({ quote, stats }: FeatureFooterProps) {
  if (!quote && (!stats || stats.length === 0)) return null;

  const sortedStats = [...(stats || [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return (
    <div className="mt-8 bg-[#FCFBFA] border border-[#E0DDD8] p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center shadow-sm">
      {/* LEFT: Quote Section */}
      {quote && (
        <div className="w-full lg:w-[40%] flex gap-4 pr-0 lg:pr-6 lg:border-r border-[#E0DDD8]/60">
          <Quote className="w-8 h-8 text-[#A18866]/40 shrink-0 fill-current rotate-180" />
          <div className="flex flex-col justify-center">
            <p className="italic text-[#444] text-[14px] leading-relaxed mb-3">
              "{quote.quote}"
            </p>
            <span className="text-[11px] uppercase tracking-widest text-[#888] font-semibold">
              — {quote.author}
            </span>
          </div>
        </div>
      )}

      {/* RIGHT: Stats Section */}
      {sortedStats.length > 0 && (
        <div className="w-full lg:w-[60%] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {sortedStats.map((stat, index) => {
            const Icon = (stat.slug ? StatIconMap[stat.slug] : null) ?? Star;
            return (
              <div
                key={stat.slug}
                className={`flex flex-col items-center text-center ${index !== sortedStats.length - 1 ? "md:border-r md:border-[#E0DDD8]/60" : ""}`}
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-[#A18866]">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="font-display text-[24px] text-[#111] leading-none">
                    {stat.value}
                  </span>
                </div>
                <span className="text-[14px] text-[#666] leading-[1.4] max-w-[120px]">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
