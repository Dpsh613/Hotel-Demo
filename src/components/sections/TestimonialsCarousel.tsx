"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import type { Testimonial, TestimonialsData } from "@/types";

type TestimonialsDataWithList = TestimonialsData & {
  testimonials?: Testimonial[];
};

interface TestimonialsCarouselProps {
  data: TestimonialsDataWithList;
  items: Testimonial[];
}

export function TestimonialsCarousel({
  data,
  items,
}: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll("[data-card]");
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <section className="py-20 md:py-32 w-full bg-surface-alternate border-y border-border-subtle overflow-hidden">
      <div className="container-content">
        <SectionReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary">
            {data.section_heading}
          </h2>
          {data.section_subheading && (
            <p className="text-lg text-text-secondary mt-2">
              {data.section_subheading}
            </p>
          )}
        </SectionReveal>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5"
          style={{ scrollbarWidth: "none" }}
          onScroll={(e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const cardWidth = 320 + 24; // width + gap
            const newIndex = Math.round(scrollLeft / cardWidth);
            if (newIndex !== activeIndex) setActiveIndex(newIndex);
          }}
        >
          {items.map((t) => (
            <div
              key={t.slug}
              data-card
              className="flex-shrink-0 w-[320px] snap-start"
            >
              <TestimonialCard
                quote={t.quote}
                authorName={t.author_name}
                authorTitle={t.author_title}
                authorImageRef={t.author_image_ref}
                authorImageAlt={t.author_image_alt}
                rating={t.rating}
                sourcePlatform={t.source_platform}
                featured={t.featured}
              />
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div
          className="flex gap-2 justify-center mt-6"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {items.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Testimonial ${index + 1}`}
              onClick={() => scrollToCard(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors duration-[var(--motion-duration-base)]",
                index === activeIndex ? "bg-brand-primary" : "bg-border-strong",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
