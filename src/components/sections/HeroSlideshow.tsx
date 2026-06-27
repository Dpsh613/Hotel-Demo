"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { HeroContent } from "@/types";
import { cn } from "@/lib/utils";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// This component expects props.
interface HeroSlideshowProps {
  // means it expects one prop, named hero and its shape is HeroContent
  hero: HeroContent;
}

export function HeroSlideshow({ hero }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const images = hero.slideshow_images || [];

  if (!images.length) return null;

  const onAutoplayTimeLeft = (
    s: SwiperType,
    time: number,
    progress: number,
  ) => {
    // progress goes from 1 to 0 (1 when starting, 0 when ending)
    // we want width from 0% to 100%
    const currentProgressElement = document.getElementById(
      `progress-${s.realIndex}`,
    );
    if (currentProgressElement) {
      currentProgressElement.style.width = `${(1 - progress) * 100}%`;
    }
  };

  return (
    <section
      role="region"
      aria-label="Featured images slideshow"
      className="relative w-full h-[100svh] overflow-hidden bg-[#1A1A18]"
    >
      {/* visible to screen readers only. basically saying slide 2 of 5 when slide changes. aria-live=polite - dont interrupt user, read update when appropriate */}
      <div className="sr-only" aria-live="polite">
        Slide {currentIndex + 1} of {images.length}
      </div>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1200}
        fadeEffect={{ crossFade: true }}
        grabCursor={true}
        watchSlidesProgress={true}
        resistanceRatio={0.65}
        loop={images.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
          // Reset all progress bars to prevent graphical glitches
          images.forEach((_, i) => {
            const el = document.getElementById(`progress-${i}`);
            if (el && i !== swiper.realIndex) el.style.width = "0%";
          });
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="absolute inset-0 w-full h-full z-10"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.image_ref}
            className="w-full h-full overflow-hidden bg-black"
          >
            {({ isActive, isPrev }) => (
              <div className="relative w-full h-full">
                <div
                  className={cn(
                    "absolute inset-0 w-full h-full transition-transform origin-center",
                    isActive || isPrev ? "animate-ken-burns" : "",
                  )}
                  style={
                    { "--ken-burns-duration": "10000ms" } as React.CSSProperties
                  }
                >
                  {image.mobile_image_ref ? (
                    <>
                      <Image
                        src={image.mobile_image_ref}
                        alt={image.alt_text || "Hero image"}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? undefined : "lazy"}
                        className="object-cover object-center md:hidden"
                        sizes="100vw"
                      />
                      <Image
                        src={image.image_ref}
                        alt={image.alt_text || "Hero image"}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? undefined : "lazy"}
                        className="object-cover object-center hidden md:block"
                        sizes="100vw"
                      />
                    </>
                  ) : (
                    <Image
                      src={image.image_ref}
                      alt={image.alt_text || "Hero image"}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  )}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Premium Overlay */}
      <div className="absolute inset-x-0 top-0 h-48 z-20 pointer-events-none bg-gradient-to-b from-black/40 to-transparent" />

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-black/5" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.15) 100%)",
          }}
        />
      </div>
      {/* Text Block */}
      <div className="absolute z-30 bottom-[48px] left-0 right-0 pl-6 md:pl-[60px] pr-6 pointer-events-none">
        <div className="max-w-[500px]">
          {hero.eyebrow_text && (
            <div className="text-[16px] tracking-[0.15em] text-white/90 mb-2   uppercase font-semibold">
              {hero.eyebrow_text.split("SIDE").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <em className="font-display italic tracking-normal">
                      SIDE
                    </em>
                  )}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-[32px] md:text-[34px] leading-[1.1] text-white font-semibold pointer-events-auto">
            {hero.headline_parts?.length
              ? hero.headline_parts.map((part, i) => (
                  <span key={i} className="block">
                    {part.text}
                  </span>
                ))
              : hero.headline}
          </h1>
        </div>
      </div>

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute z-30 bottom-[48px] right-6 md:right-[60px] hidden md:flex gap-[12px] items-center pointer-events-auto">
          {images.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.slideToLoop(index);
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
                className="group py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
              >
                <div className="relative h-[2px] w-12 bg-white/20 overflow-hidden">
                  <div
                    id={`progress-${index}`}
                    className={cn(
                      "absolute top-0 left-0 h-full bg-white",
                      !isActive && "w-0 transition-none",
                    )}
                    style={{ width: isActive ? "0%" : "0%" }} // Handled via JS during active autoplay
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
