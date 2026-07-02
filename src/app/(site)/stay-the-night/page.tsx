import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomData } from "@/types/pages";
import {
  getServiceBySlug,
  getRoomsByServiceSlug,
  getOnePriceConcept,
  getFeatureGroup,
  getFeaturesConfig,
} from "@/lib/data/loaders";
import { QuickNavBar } from "@/components/interactive/QuickNavBar";
import { RoomCard } from "@/components/cards/RoomCard";
import { OnePriceConcept } from "@/components/sections/OnePriceConcept";
import { WhatsIncludedSection } from "@/components/sections/WhatsIncludedSection";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("stay-the-night");
  if (!service) return {};

  return buildMetadata({
    title: service.meta_title || service.page_title,
    description: service.meta_description || "",
    path: "/stay-the-night",
  });
}

export default async function StayTheNightPage() {
  const slug = "stay-the-night";

  const [service, rooms, onePriceConcept, inclusions, features] =
    await Promise.all([
      getServiceBySlug(slug),
      getRoomsByServiceSlug(slug),
      getOnePriceConcept(slug),
      getFeatureGroup("room-inclusions"),
      getFeaturesConfig(),
    ]);

  if (!service) notFound();

  const showPricing = !!features?.pricing_visible;

  return (
    <>
      {/* 1. Page Header Section */}
      <section className="bg-[#F0EDE8] flex flex-col justify-center pt-[140px] pb-[60px]">
        <div className="container-content w-full">
          <SectionReveal>
            <h1 className="font-display text-[42px] text-[#111] font-normal">
              {service.page_title}
            </h1>
            {service.page_subtitle && (
              <p className="text-[15px] text-[#111]/80 leading-relaxed max-w-[460px] mt-[16px]">
                {service.page_subtitle}
              </p>
            )}

            {/* Quick Nav */}
            {features?.quick_navigation &&
              service.quick_nav_items &&
              service.quick_nav_items.length > 0 && (
                <div className="mt-[40px] min-h-[44px]">
                  <QuickNavBar items={service.quick_nav_items} />
                </div>
              )}
          </SectionReveal>
        </div>
      </section>

      {/* 2. Horizontal separator */}
      <hr className="border-[#E0DDD8]" />

      {/* 3. Room Cards Section */}
      {rooms.length > 0 && (
        <section id="our-rooms" className="bg-[#FFFFFF] py-[60px] scroll-mt-24">
          <div className="container-content">
            <div className="flex flex-col">
              {rooms.map((room: RoomData, index: number) => (
                <div key={room.slug}>
                  <SectionReveal delay={index * 0.2}>
                    <RoomCard room={room} showPricing={showPricing} />
                  </SectionReveal>
                  {index < rooms.length - 1 && (
                    <hr className="border-[#E0DDD8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. One Price Concept Section */}
      {onePriceConcept && (
        <OnePriceConcept
          headline={onePriceConcept.headline}
          body={onePriceConcept.body}
          inclusionsHeading={onePriceConcept.inclusions_heading || ""}
          inclusionsBody={onePriceConcept.inclusions_body || ""}
          cateringNote={onePriceConcept.catering_note}
          supportingImageRef={onePriceConcept.supporting_image_ref}
          supportingImageAlt={onePriceConcept.supporting_image_alt}
          showTailoredSection={onePriceConcept.show_tailored_section ?? true}
          background="alternate"
        />
      )}

      {/* 5. What's Included Section */}
      {inclusions && inclusions.items.length > 0 && (
        <WhatsIncludedSection inclusions={inclusions} />
      )}
    </>
  );
}
