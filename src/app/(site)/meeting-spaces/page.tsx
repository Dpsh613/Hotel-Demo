import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpaceData } from "@/types/pages";
import {
  getServiceBySlug,
  getSpacesByServiceSlug,
  getOnePriceConcept,
  getFeatureGroup,
  getFeaturesConfig,
} from "@/lib/data/loaders";

import { QuickNavBar } from "@/components/interactive/QuickNavBar";
import { SpaceCard } from "@/components/cards/SpaceCard";
import { OnePriceConcept } from "@/components/sections/OnePriceConcept";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("meeting-spaces");
  if (!service) return {};

  return buildMetadata({
    title: service.meta_title || service.page_title,
    description: service.meta_description || "",
    path: "/meeting-spaces",
  });
}

export default async function MeetingSpacesPage() {
  const slug = "meeting-spaces";

  const [service, spaces, onePriceConcept, technologies, amenities, features] =
    await Promise.all([
      getServiceBySlug(slug),
      getSpacesByServiceSlug(slug),
      getOnePriceConcept(slug),
      getFeatureGroup("technologies"),
      getFeatureGroup("amenities"),
      getFeaturesConfig(),
    ]);

  if (!service) notFound();

  return (
    <>
      {/* Custom Header Section */}
      <section className="bg-[#F0EDE8] min-h-[50vh] flex flex-col justify-center pt-[180px] pb-[40px]">
        <div className="container-content w-full">
          <SectionReveal className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-display text-[38px] text-[#111] font-semibold">
              {service.page_title}
            </h1>
            {service.page_subtitle && (
              <p className="text-[15px] text-[#111]/80 leading-relaxed max-w-[460px] mt-[10px]">
                {service.page_subtitle}
              </p>
            )}

            {/* Quick Nav */}
            {features?.quick_navigation &&
              service.quick_nav_items &&
              service.quick_nav_items.length > 0 && (
                <div className="mt-12 w-full flex justify-center md:justify-start">
                  <div className="text-left w-full md:w-auto">
                    <QuickNavBar items={service.quick_nav_items} />
                  </div>
                </div>
              )}
          </SectionReveal>
        </div>
      </section>

      {/* The Spaces Section */}
      {spaces.length > 0 && (
        <section
          id="the-spaces"
          className="bg-[#FFFFFF] py-[60px] scroll-mt-24"
        >
          <div className="container-content">
            <div className="flex flex-col">
              {spaces.map((space: SpaceData, index: number) => (
                <div key={space.slug}>
                  <SectionReveal delay={index * 0.2}>
                    <SpaceCard space={space} />
                  </SectionReveal>
                  {index < spaces.length - 1 && (
                    <hr className="border-[#E0DDD8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* One Price Concept Section */}
      {onePriceConcept && (
        <OnePriceConcept
          headline={onePriceConcept.headline}
          body={onePriceConcept.body}
          inclusionsHeading={onePriceConcept.inclusions_heading || ""}
          inclusionsBody={onePriceConcept.inclusions_body || ""}
          cateringNote={onePriceConcept.catering_note}
          supportingImageRef={onePriceConcept.supporting_image_ref}
          supportingImageAlt={onePriceConcept.supporting_image_alt}
          background="alternate"
        />
      )}

      {/* Technologies Section */}
      {technologies && technologies.items.length > 0 && (
        <section
          id="technologies"
          className="bg-[#F0EDE8] py-[2px] scroll-mt-24"
        >
          <div className="container-content">
            <div className="w-full max-w-[950px] mx-auto">
              <SectionReveal>
                <h2 className="font-display text-[38px] text-[#111] font-semibold mb-5 text-left">
                  {technologies.heading || "Technologies"}
                </h2>
              </SectionReveal>

              <FeaturesGrid featureGroup={technologies} variant="compact" />
            </div>
          </div>
        </section>
      )}

      {/* Amenities Section */}
      {amenities && amenities.items.length > 0 && (
        <section id="amenities" className="bg-[#F0EDE8] py-[50px] scroll-mt-24">
          <div className="container-content">
            <div className="w-full max-w-[950px] mx-auto">
              <SectionReveal>
                <h2 className="font-display text-[38px] text-[#111] font-semibold mb-1 text-left">
                  {amenities.heading || "Amenities"}
                </h2>
                {amenities.intro && (
                  <p className="text-[15px] text-[#111]/80 leading-relaxed max-w-[520px] mb-8 text-left">
                    {amenities.intro}
                  </p>
                )}
              </SectionReveal>

              <FeaturesGrid featureGroup={amenities} variant="expanded" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
