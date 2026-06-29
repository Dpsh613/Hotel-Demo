import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  tagline: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function ServiceCard({
  title,
  tagline,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: ServiceCardProps) {
  return (
    <article className="border border-[#E0DDD8] rounded-[8px] bg-white h-full flex flex-col group p-2 hover:bg-[#F5F5F5] cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden shrink-0 rounded-t-[8px] rounded-b-[8px]">
        <Image
          fill
          src={imageSrc}
          alt={imageAlt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="pt-6 px-4 pb-4 flex flex-col flex-1">
        <h3 className="font-display text-[24px] text-[#111] font-semibold mb-3">
          {title}
        </h3>
        <p className="text-[16px] text-[#111] leading-relaxed mb-6 flex-1">
          {tagline}
        </p>

        <div className="flex justify-end mt-auto">
          <Link
            href={ctaHref as Route}
            className="inline-flex items-center gap-2 border border-[#E0DDD8] rounded-full py-2 px-4 hover:bg-[#F5F2ED] transition-colors"
            aria-label={`Learn more about ${title}`}
          >
            <span className="text-[14px] tracking-[0.1em] uppercase text-[#111] font-medium">
              {ctaText}
            </span>
            <ArrowUpRight className="size-3.5 text-[#111]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
