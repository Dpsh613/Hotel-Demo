import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  Bed,
  Gift,
  Utensils,
  Leaf,
  Camera,
  Sparkles,
} from "lucide-react";
import type { DiscoverItem } from "@/types/components";

interface DiscoverCardProps {
  item: DiscoverItem;
  originalIndex: number;
  variant: "landscape" | "square";
}

const IconMap: Record<string, React.ElementType> = {
  bed: Bed,
  party: Gift,
  restaurant: Utensils,
  tree: Leaf,
  camera: Camera,
  sparkles: Sparkles,
};

const cardStyles = [
  {
    bg: "bg-transparent",
    text: "text-white",
    iconBg: "bg-[#52524A]/80",
    iconColor: "text-white",
    ctaStyle: "button-solid",
  },
  {
    bg: "bg-[#FFFFFF]",
    text: "text-[#111111]",
    iconBg: "bg-[#C46D52]",
    iconColor: "text-white",
    ctaStyle: "link-text",
    ctaColor: "text-[#C46D52] hover:text-[#A15740]",
  },
  {
    bg: "bg-transparent",
    text: "text-white",
    iconBg: "bg-[#3A4A32]/80",
    iconColor: "text-white",
    ctaStyle: "button-solid",
  },
  {
    bg: "bg-[#282B21]",
    text: "text-white",
    iconBg: "bg-[#3D4233]",
    iconColor: "text-[#C5A97A]",
    ctaStyle: "link-text",
    ctaColor: "text-[#C5A97A] hover:text-white",
  },
  {
    bg: "bg-transparent",
    text: "text-white",
    iconBg: "bg-[#324559]/80",
    iconColor: "text-white",
    ctaStyle: "button-outline",
  },
  {
    bg: "bg-[#F7F5F2]",
    text: "text-[#111111]",
    iconBg: "bg-[#A59C90]",
    iconColor: "text-white",
    ctaStyle: "link-text",
    ctaColor: "text-[#8A8175] hover:text-[#111]",
  },
] as const;

export function DiscoverCard({
  item,
  originalIndex,
  variant,
}: DiscoverCardProps) {
  const Icon = (item.iconRef ? IconMap[item.iconRef] : null) ?? Leaf;
  const theme = cardStyles[originalIndex % cardStyles.length] ?? cardStyles[0];
  const isLandscape = variant === "landscape";

  // ==========================================
  // LANDSCAPE VARIANT (Full Image Overlay)
  // ==========================================
  if (isLandscape) {
    return (
      <article className="relative w-full h-full rounded-[12px] overflow-hidden group shadow-sm">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={item.image?.src || "/api/placeholder/800/600"}
            alt={item.image?.alt || item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw"
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          />
        </div>

        {/* Darker left gradient for text readability at smaller sizes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-10 pointer-events-none" />

        {/* Scaled-down paddings for the 60% height constraint */}
        <div className="relative z-20 flex flex-col p-2 lg:p-4 h-full justify-center w-full md:w-[75%] lg:w-[68%]">
          {/* Smaller Icon Container */}
          <div className="w-8 h-8 rounded-[5px] flex items-center justify-center mb-4 bg-black/30 backdrop-blur-sm">
            <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
          </div>

          {/* Sizing updates */}
          <h3 className="font-display text-[21px] lg:text-[24px] font-medium leading-[1.15] mb-2 text-white">
            {item.title}
          </h3>
          <p className="text-[12px] lg:text-[13px] leading-[1.5] opacity-90 text-white/95 max-w-[280px]">
            {item.description}
          </p>

          {item.cta && (
            <div className="mt-5">
              {theme.ctaStyle === "button-solid" && (
                <Link
                  href={item.cta.href as Route}
                  className="inline-flex items-center gap-2 bg-white text-[#111] rounded-[4px] py-2 px-4 hover:bg-gray-100 transition-colors w-fit"
                >
                  <span className="text-[9px] tracking-[0.15em] font-bold uppercase">
                    {item.cta.label}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
              {theme.ctaStyle === "button-outline" && (
                <Link
                  href={item.cta.href as Route}
                  className="inline-flex items-center gap-2 border border-white/30 text-white rounded-[4px] py-2 px-4 hover:bg-white/10 transition-colors w-fit"
                >
                  <span className="text-[9px] tracking-[0.15em] font-bold uppercase">
                    {item.cta.label}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }

  // ==========================================
  // SQUARE VARIANT (Split layout)
  // ==========================================
  return (
    <article
      className={`relative flex flex-col md:flex-row w-full h-full rounded-[12px] overflow-hidden ${theme.bg} shadow-sm group border border-[#E0DDD8]/40`}
    >
      {/* Tightened paddings for the split card text block */}
      <div className="flex flex-col p-5 lg:p-7 z-10 justify-center w-full md:w-[50%] shrink-0">
        <div
          className={`w-8 h-8 rounded-[5px] flex items-center justify-center mb-4 ${theme.iconBg}`}
        >
          <Icon
            className={`w-3.5 h-3.5 ${theme.iconColor}`}
            strokeWidth={1.5}
          />
        </div>

        <h3
          className={`font-serif text-[20px] lg:text-[22px] font-medium leading-[1.15] mb-2 ${theme.text}`}
        >
          {item.title}
        </h3>
        <p
          className={`text-[12px] lg:text-[13px] leading-[1.5] opacity-85 ${theme.text}`}
        >
          {item.description}
        </p>

        {item.cta && (
          <div className="mt-4">
            <Link
              href={item.cta.href as Route}
              className={`inline-flex items-center gap-2 transition-colors ${(theme as any).ctaColor}`}
            >
              <span className="text-[10px] tracking-[0.12em] font-bold uppercase">
                {item.cta.label}
              </span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      <div className="relative w-full h-[180px] md:h-auto md:w-[50%] shrink-0 overflow-hidden">
        <Image
          src={item.image?.src || "/api/placeholder/800/600"}
          alt={item.image?.alt || item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 35vw"
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />
      </div>
    </article>
  );
}
