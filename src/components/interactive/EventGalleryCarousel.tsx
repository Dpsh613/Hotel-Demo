"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

interface GalleryImage {
  image_ref: string;
  alt_text: string;
}

interface EventGalleryCarouselProps {
  images: GalleryImage[];
}

export function EventGalleryCarousel({ images }: EventGalleryCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="bg-[#FFFFFF] py-[30px] relative w-full overflow-hidden">
      {/* Left Fade Overlay */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[80px] md:w-[250px] bg-gradient-to-r from-white via-white/80 to-transparent z-[5]" />

      {/* Prev Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-[20px] md:left-[60px] top-1/2 -translate-y-1/2 z-10 w-[44px] h-[44px] rounded-full border border-[#111] bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
        aria-label="Previous images"
      >
        <ChevronLeft className="w-5 h-5 text-[#111]" />
      </button>

      {/* Image Track */}
      <div className="w-full relative z-[1]">
        <Swiper
          modules={[Autoplay, Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView="auto"
          spaceBetween={40}
          loop={true}
          centeredSlides={true}
          speed={800}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          className="!overflow-visible"
        >
          {[...images, ...images, ...images].map((img, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <div className="w-[260px] md:w-[280px] h-[340px] md:h-[400px] rounded-[32px] overflow-hidden relative">
                <Image
                  src={img.image_ref}
                  alt={img.alt_text}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, 280px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Fade Overlay */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[80px] md:w-[250px] bg-gradient-to-l from-white via-white/80 to-transparent z-[5]" />

      {/* Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-[20px] md:right-[60px] top-1/2 -translate-y-1/2 z-10 w-[44px] h-[44px] rounded-full border border-[#111] bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
        aria-label="Next images"
      >
        <ChevronRight className="w-5 h-5 text-[#111]" />
      </button>
    </section>
  );
}
