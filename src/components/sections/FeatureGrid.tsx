import {
  Check,
  Sliders,
  Leaf,
  MapPin,
  Tag,
  Trees,
  Briefcase,
  Globe,
  Monitor,
  Headphones,
  Cast,
  LayoutTemplate,
  Wifi,
  PlugZap,
  Coffee,
  Sun,
  Eye,
  Home
} from "lucide-react";
import Image from "next/image";
import { SectionReveal } from "@/components/animation/SectionReveal";
import type { FeatureGroup } from "@/types/components";

interface FeaturesGridProps {
  featureGroup: FeatureGroup;
  variant?: "compact" | "expanded";
}

const iconMap: Record<string, React.ElementType> = {
  freedom: Sliders,
  "eco-friendly": Leaf,
  convenient: MapPin,
  "one-price": Tag,
  nature: Trees,
  professionals: Briefcase,
  multilingual: Globe,
  Monitor: Monitor,
  Headphones: Headphones,
  Cast: Cast, 
  LayoutTemplate: LayoutTemplate,
  Wifi: Wifi,
  PlugZap: PlugZap,
  Coffee: Coffee,
  Sun: Sun,
  Eye: Eye,
  Trees: Trees,
  Home: Home,
};

export function FeaturesGrid({ featureGroup, variant }: FeaturesGridProps) {

  // 2. "icon-grid" layout (e.g. Technologies)
  if (featureGroup.display_layout === "icon-grid") {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E0DDD8] border border-[#E0DDD8] rounded-[8px] overflow-hidden">
          {featureGroup.items.map((item, index) => {
            // resolve icon from icon_ref if available, fallback to Check
            const Icon = (item as any).icon_ref ? (iconMap[(item as any).icon_ref] || Check) : Check;
            
            return (
              <div 
                key={item.slug} 
                className="py-[32px] px-[24px] text-center bg-white"
              >
                <div className="flex flex-col items-center justify-center">
                  <Icon className="size-8 text-[#888] mb-3" />
                  <h3 className="text-[18px] text-[#111] mb-1 font-display font-bold">
                    {item.label}
                  </h3>
                  {item.descriptor && (
                    <p className="text-[13px] text-[#111]/80">
                      {item.descriptor}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {featureGroup.note && (
          <p className="mt-6 text-[15px] md:text-[13px] text-[#111] max-w-full md:max-w-[50%] text-center md:text-left mx-auto md:mx-0">
            {featureGroup.note}
          </p>
        )}
      </div>
    );
  }

  // 3. "photo-card-grid" layout (e.g. Amenities)
  if (featureGroup.display_layout === "photo-card-grid") {
    const firstRowItems = featureGroup.items.slice(0, 3);
    const secondRowItems = featureGroup.items.slice(3, 5);

    return (
      <div className="flex flex-col gap-[16px]">
        {/* Row 1: 3 columns */}
        {firstRowItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {firstRowItems.map((item, index) => {
              const Icon = (item as any).icon_ref ? (iconMap[(item as any).icon_ref] || Check) : Check;
              const imgRef = (item as any).image_ref;
              
              return (
                <div key={item.slug} className="bg-[#FFFFFF] rounded-[12px] flex flex-col shadow-sm p-[16px]">
                  <div className="relative w-full aspect-[4/3] bg-[#F0EDE8] rounded-[8px] overflow-hidden mb-4">
                    {imgRef && (
                      <Image 
                        src={imgRef}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="flex-1 px-1">
                    <div className="flex items-center gap-[8px] mb-2">
                      <Icon className="size-4 text-[#111]" />
                      <h3 className="text-[20px] font-semibold text-[#111] font-display">
                        {item.label}
                      </h3>
                    </div>
                    {item.body && (
                      <p className="text-[13px] text-[#111]/80 leading-relaxed">
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Row 2: 2 columns, centered */}
        {secondRowItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full md:max-w-[calc(66.666%+8px)] mx-auto">
            {secondRowItems.map((item, index) => {
              const Icon = (item as any).icon_ref ? (iconMap[(item as any).icon_ref] || Check) : Check;
              const imgRef = (item as any).image_ref;
              
              return (
                <div key={item.slug} className="bg-[#FFFFFF] rounded-[12px] flex flex-col shadow-sm p-[16px]">
                  <div className="relative w-full aspect-[4/3] bg-[#F0EDE8] rounded-[8px] overflow-hidden mb-4">
                    {imgRef && (
                      <Image 
                        src={imgRef}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="flex-1 px-1">
                    <div className="flex items-center gap-[8px] mb-2">
                      <Icon className="size-4 text-[#111]" />
                      <h3 className="text-[18px] font-semibold text-[#111] font-display">
                        {item.label}
                      </h3>
                    </div>
                    {item.body && (
                      <p className="text-[13px] text-[#111]/80 leading-relaxed">
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Fallback / standard list view
  const isCompact = variant === "compact";
  const gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12";

  return (
    <div>
      <div className={gridClass}>
        {featureGroup.items.map((item, index) => (
          <SectionReveal
            key={item.slug}
            delay={index * 0.08}
            className="flex gap-4"
          >
            <div className="shrink-0 mt-1 text-brand-primary">
              <Check className="size-7 md:size-8" />
            </div>
            <div>
              <h3 className="text-body-large font-medium text-text-primary">
                {item.label}
              </h3>
              {(item.descriptor || item.body) && (
                <p className="text-body-base text-text-secondary mt-1">
                  {item.descriptor || item.body}
                </p>
              )}
            </div>
          </SectionReveal>
        ))}
      </div>
      {featureGroup.note && (
        <SectionReveal
          delay={featureGroup.items.length * 0.08}
          className="mt-12"
        >
          <p className="italic text-text-secondary text-body-base max-w-2xl">
            * {featureGroup.note}
          </p>
        </SectionReveal>
      )}
    </div>
  );
}
