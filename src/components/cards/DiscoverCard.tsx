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
    iconBg: "bg-[#C46D52]",
    iconColor: "text-white",
    ctaStyle: "link-text",
    ctaColor: "text-[#C46D52] hover:text-white",
  },
  {
    bg: "bg-transparent",
    text: "text-white",
    iconBg: "bg-[#324559]/80",
    iconColor: "text-white",
    ctaStyle: "button-solid",
  },
  {
    bg: "bg-[#F7F5F2]",
    text: "text-[#111111]",
    iconBg: "bg-[#C46D52]",
    iconColor: "text-white",
    ctaStyle: "link-text",
    ctaColor: "text-[#C46D52] hover:text-[#111]",
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
      <article className="relative w-full h-full overflow-hidden group shadow-sm">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={item.image?.src || "/api/placeholder/800/600"}
            alt={item.image?.alt || item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw"
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-10 pointer-events-none" />

        {/* FIXED: Increased padding from p-2 to p-6/p-10 so the text has proper margins */}
        <div className="relative z-20 flex flex-col p-6 md:p-8 lg:p-10 h-full justify-center w-full md:w-[85%] lg:w-[68%]">
          <div className="w-8 h-8 flex items-center justify-center shrink-0 mb-4 bg-black/30 backdrop-blur-sm">
            <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
          </div>

          <h3 className="font-display text-[24px] mb-2 text-white">
            {item.title}
          </h3>
          <p className="text-[13px] lg:text-[14px] opacity-90 text-white/95 max-w-[300px]">
            {item.description}
          </p>

          {item.cta && (
            <div className="mt-5">
              {theme.ctaStyle === "button-solid" && (
                <Link
                  href={item.cta.href as Route}
                  className="inline-flex items-center gap-2 bg-white text-[#111] rounded-[4px] py-2 px-4 transition-transform duration-[2s] ease-out hover:scale-105 w-fit"
                >
                  <span className="text-[15px] tracking-[0.1em] font-bold uppercase">
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
      className={`relative flex flex-col md:flex-row w-full h-full overflow-hidden ${theme.bg} shadow-sm group border border-[#E0DDD8]/40`}
    >
      {/* FIXED: Standardized padding to p-6/p-8 so text doesn't look stretched or cramped */}
      <div className="flex flex-col p-6 lg:p-8 z-10 justify-center w-full md:w-[60%] shrink-0">
        <div
          className={`w-8 h-8 rounded-[5px] flex items-center justify-center  shrink-0 mb-4 ${theme.iconBg}`}
        >
          <Icon
            className={`w-3.5 h-3.5 ${theme.iconColor}`}
            strokeWidth={1.5}
          />
        </div>

        <h3
          className={`font-serif text-[22px] lg:text-[24px] font-medium leading-[1.15] mb-2 ${theme.text}`}
        >
          {item.title}
        </h3>
        <p
          className={`text-[13px] lg:text-[14px] leading-[1.6] opacity-85 ${theme.text}`}
        >
          {item.description}
        </p>

        {item.cta && (
          <div className="mt-4">
            <Link
              href={item.cta.href as Route}
              className={`inline-flex items-center gap-2 transition-colors ${(theme as any).ctaColor}`}
            >
              <span className="text-[14px] tracking-[0.1em] font-bold uppercase">
                {item.cta.label}
              </span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* FIXED: Changed md:h-auto to md:h-full to force image to fully respect the 340px height */}
      <div className="relative w-full h-[200px] md:h-full md:w-[50%] shrink-0 overflow-hidden">
        <Image
          src={item.image?.src || "/api/placeholder/800/600"}
          alt={item.image?.alt || item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />
      </div>
    </article>
  );
}
