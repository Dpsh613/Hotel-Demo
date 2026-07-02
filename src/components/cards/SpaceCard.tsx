"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, LayoutGrid, Star } from "lucide-react";
import type { SpaceData } from "@/types/pages";
import { useLightbox } from "@/hooks/useLightbox";
import dynamic from "next/dynamic";

const LightboxGallery = dynamic(
  () =>
    import("@/components/interactive/LightboxGallery").then(
      (mod) => mod.LightboxGallery,
    ),
  { ssr: false },
);

export interface SpaceCardProps {
  space: SpaceData;
}

export function SpaceCard({ space }: SpaceCardProps) {
  const images = space.gallery_images || [];
  const lightbox = useLightbox(images.length);

  const [imageError, setImageError] = useState(false);

  const coverImage = space.cover_image_ref || "/images/placeholder.jpg";
  const coverAlt = space.cover_image_alt || space.name;
  const galleryTriggerLabel = space.gallery_trigger_label || "OPEN GALLERY";

  const mappedImages = images.map((img) => ({
    src: img.image_ref,
    alt: img.alt_text || space.name,
  }));

  const areaText =
    space.area_display || (space.area_sqm ? `${space.area_sqm}m²` : undefined);

  return (
    <>
      <article
        className="p-6 md:p-8 -mx-6 md:-mx-8 my-2 md:my-4 rounded-2xl transition-colors duration-300 hover:bg-[#F4F4F4] group cursor-pointer"
        onClick={() => lightbox.open(0)}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Left Side: Image */}
          <div className="shrink-0 w-full md:w-[320px] lg:w-[380px]">
            <div
              className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden ${
                imageError ? "bg-[#F0EDE8]" : "bg-gray-100"
              }`}
            >
              {!imageError && (
                <Image
                  fill
                  src={coverImage}
                  alt={coverAlt}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 100vw"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Row 1: Name & Button */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center md:justify-between items-center md:items-start w-full">
              <h2 className="font-display text-[28px] text-[#111] font-semibold">
                {space.name}
              </h2>
              {mappedImages.length > 0 && (
                <div className="border border-[#111] rounded-full px-5 py-2 text-[11px] tracking-[0.1em] uppercase text-[#111] group-hover:bg-[#111] group-hover:text-white transition-colors duration-300">
                  {galleryTriggerLabel}
                </div>
              )}
            </div>

            {/* Row 2: Capacity */}
            {space.capacity_label && (
              <p className="text-[13px] tracking-[0.12em] uppercase text-[#888] font-medium mt-2 md:mt-1">
                {space.capacity_label}
              </p>
            )}

            {/* Row 3: Specs */}
            <ul className="flex flex-col gap-[6px] mt-4 items-center md:items-start">
              {areaText && (
                <li className="flex items-center gap-2">
                  <Maximize2 className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">{areaText}</span>
                </li>
              )}
              {space.layout_styles?.map((style, idx) => (
                <li key={`style-${idx}`} className="flex items-center gap-2">
                  <LayoutGrid className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">{style}</span>
                </li>
              ))}
              {space.special_features?.map((feature, idx) => (
                <li key={`feat-${idx}`} className="flex items-center gap-2">
                  <Star className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Row 4: Description */}
            {(space.description_long || space.description_short) && (
              <p className="text-[15px] text-[#111] leading-relaxed mt-4 max-w-[520px]">
                {space.description_long || space.description_short}
              </p>
            )}
          </div>
        </div>
      </article>

      {mappedImages.length > 0 && (
        <LightboxGallery
          isOpen={lightbox.isOpen}
          onClose={lightbox.close}
          images={mappedImages}
          title={space.name}
          subtitle={space.capacity_label}
          currentIndex={lightbox.currentIndex}
          next={lightbox.next}
          prev={lightbox.prev}
          goTo={lightbox.goTo}
        />
      )}
    </>
  );
}
