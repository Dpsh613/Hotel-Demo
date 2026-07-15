import Image from "next/image";
import {
  Home,
  TreePine,
  MapPin,
  Tag,
  Cake,
  Armchair,
  Heart,
  Users,
} from "lucide-react";

import type { FeatureItem } from "@/types";
const IconMap: Record<string, React.ElementType> = {
  home: Home,
  nature: TreePine,
  convenient: MapPin,
  "one-price": Tag,
  celebrations: Cake,
  comfort: Armchair,
  memories: Heart,
  "group-stays": Users,
};

interface FeatureCardProps {
  item: FeatureItem;
}

export function FeatureCard({ item }: FeatureCardProps) {
  const Icon = (item.icon_ref ? IconMap[item.icon_ref] : null) ?? Home;

  return (
    <article className="bg-[#FCFBFA] overflow-hidden border border-[#E0DDD8]/60 flex flex-col h-full shadow-sm group transition-shadow hover:shadow-md">
      {/* Text Content Area */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Top: Icon + Title */}
        <div className="flex items-start gap-4 mb-3">
          <div className="w-9 h-9 rounded-md bg-[#F4F1ED] flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-[#C46D52]" strokeWidth={2} />
          </div>
          <h3 className="font-serif text-[20px] text-[#111] font-medium">
            {item.label}
          </h3>
        </div>

        {/* Body Text */}
        <p className="text-[14px] text-[#666] leading-[1.2]">
          {item.body ||
            "Experience comfort and seamless service tailored to make your stay unforgettable."}
        </p>
      </div>

      {/* Bottom Image Area */}
      <div className="relative w-full h-[130px] sm:h-[150px] overflow-hidden">
        <Image
          src={item.image_ref || `/api/placeholder/600/400?text=${item.slug}`}
          alt={item.label}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />
      </div>
    </article>
  );
}
