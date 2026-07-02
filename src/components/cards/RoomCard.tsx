"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, BedDouble, Bath, Star, Euro, Info } from "lucide-react";
import type { RoomData } from "@/types/pages";
import { useLightbox } from "@/hooks/useLightbox";
import dynamic from "next/dynamic";
import { formatCurrency } from "@/lib/utils";

const LightboxGallery = dynamic(
  () =>
    import("@/components/interactive/LightboxGallery").then(
      (mod) => mod.LightboxGallery,
    ),
  { ssr: false },
);

export interface RoomCardProps {
  room: RoomData;
  showPricing?: boolean;
}

export function RoomCard({ room, showPricing }: RoomCardProps) {
  const images = room.gallery_images || [];
  const lightbox = useLightbox(images.length);

  const [imageError, setImageError] = useState(false);

  const firstImage = images.length > 0 ? images[0] : null;
  const coverImage =
    room.cover_image_ref ||
    (firstImage ? firstImage.image_ref : "/images/placeholder.jpg");
  const coverAlt = room.cover_image_alt || room.name;
  const galleryTriggerLabel = room.gallery_trigger_label || "OPEN GALLERY";

  const mappedImages = images.map((img) => ({
    src: img.image_ref,
    alt: img.alt_text || room.name,
  }));

  const areaText =
    room.area_display || (room.area_sqm ? `${room.area_sqm}m²` : undefined);

  const capacityText = room.capacity_label || "";

  return (
    <>
      <article
        className="p-6 md:p-8 -mx-6 md:-mx-8 my-2 md:my-4 rounded-2xl transition-colors duration-300 hover:bg-[#F4F4F4] group cursor-pointer"
        onClick={() => lightbox.open(0)}
      >
        <div className="flex flex-col md:flex-row gap-12">
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
          <div className="flex-1 flex flex-col">
            {/* Row 1: Name & Button */}
            <div className="flex flex-wrap gap-4 justify-between items-start">
              <h2 className="font-display text-[28px] text-[#111] font-semibold">
                {room.name}
              </h2>
              {mappedImages.length > 0 && (
                <div className="border border-[#111] rounded-full px-5 py-2 text-[11px] tracking-[0.1em] uppercase text-[#111] group-hover:bg-[#111] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {galleryTriggerLabel}
                </div>
              )}
            </div>

            {/* Row 2: Capacity & Room count */}
            {capacityText && (
              <p className="text-[13px] tracking-[0.12em] uppercase text-[#888] font-medium mt-1">
                {capacityText}
              </p>
            )}

            {/* Row 3: Specs */}
            <ul className="flex flex-col gap-[6px] mt-4">
              {areaText && (
                <li className="flex items-center gap-2">
                  <Maximize2 className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">{areaText}</span>
                </li>
              )}
              {room.bed_configuration && (
                <li className="flex items-center gap-2">
                  <BedDouble className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">
                    {room.bed_configuration}
                  </span>
                </li>
              )}
              {room.bathroom_type && room.bathroom_type !== "none" && (
                <li className="flex items-center gap-2">
                  <Bath className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111] capitalize">
                    {room.bathroom_type} bathroom
                  </span>
                </li>
              )}
              {room.bathroom_features?.map((feature, idx) => (
                <li key={`bath-${idx}`} className="flex items-center gap-2">
                  <Bath className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">{feature}</span>
                </li>
              ))}
              {room.exclusive_features?.map((feature, idx) => (
                <li key={`feat-${idx}`} className="flex items-center gap-2">
                  <Star className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">{feature}</span>
                </li>
              ))}

              {/* Pricing as a spec item */}
              {showPricing && (room.rate_single || room.rate_double) && (
                <li className="flex items-center gap-2">
                  <Euro className="size-4 text-[#111]" />
                  <span className="text-[16px] text-[#111]">
                    Rate per night: {room.rate_from_text && "from "}
                    {room.rate_single && (
                      <>
                        {formatCurrency(room.rate_single, room.rate_currency)}{" "}
                        (single)
                      </>
                    )}
                    {room.rate_single && room.rate_double && " · "}
                    {room.rate_double && (
                      <>
                        {formatCurrency(room.rate_double, room.rate_currency)}{" "}
                        (double)
                      </>
                    )}
                  </span>
                </li>
              )}

              {/* Tomorrowland note */}
              {room.rate_note && (
                <li className="flex items-start gap-2 mt-1">
                  <Info className="size-4 text-[#888] shrink-0 mt-[2px]" />
                  <span className="text-[13px] italic text-[#888]">
                    {room.rate_note}
                  </span>
                </li>
              )}
            </ul>

            {/* Row 4: Description */}
            {(room.description_long || room.description_short) && (
              <p className="text-[15px] text-[#111] leading-relaxed mt-4 max-w-[520px]">
                {room.description_long || room.description_short}
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
          title={room.name}
          subtitle={capacityText}
          currentIndex={lightbox.currentIndex}
          next={lightbox.next}
          prev={lightbox.prev}
          goTo={lightbox.goTo}
        />
      )}
    </>
  );
}
