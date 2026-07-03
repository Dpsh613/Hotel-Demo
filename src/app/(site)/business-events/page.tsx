import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Users,
  Table,
  LayoutGrid,
  GlassWater,
  Coffee,
  Mic,
} from "lucide-react";
import {
  getServiceBySlug,
  getEventsPageData,
  getFeatureGroup,
  getFeaturesConfig,
} from "@/lib/data/loaders";
import { EventGalleryCarousel } from "@/components/interactive/EventGalleryCarousel";
import { AccordionInfoCard } from "@/components/interactive/AccordionInfoCard";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";

// Helper for dynamic lucide icons
const IconMap: Record<string, React.ElementType> = {
  Users,
  Table,
  LayoutGrid,
  GlassWater,
  Coffee,
  Mic,
};

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("business-events");
  if (!service) return {};

  return buildMetadata({
    title: service.meta_title || service.page_title,
    description: service.meta_description || "",
    path: "/business-events",
  });
}

export default async function BusinessEventsPage() {
  const slug = "business-events";

  const [service, eventsData, technologies, amenities, features] =
    await Promise.all([
      getServiceBySlug(slug),
      getEventsPageData(),
      getFeatureGroup("technologies"),
      getFeatureGroup("amenities"),
      getFeaturesConfig(),
    ]);

  if (!service || !eventsData) notFound();

  const heroImageRef = eventsData.hero_image_ref || service.hero_image_ref;
  const heroMobileRef = eventsData.hero_mobile_ref;
  const heroImageAlt =
    eventsData.hero_image_alt || service.hero_image_alt || "Business Events";
  const eyebrow = eventsData.page_eyebrow || "BUSINESS EVENTS";
  const headline =
    eventsData.hero_headline ||
    "Host your next corporate event in a private, nature-infused setting designed to inspire and impress.";

  // We only use QuickNav if we have specific sections for events
  const quickNavItems = [
    { label: "Pricing", id: "pricing" },
    { label: "Versatile Setup", id: "setup" },
    { label: "Technologies", id: "technologies" },
    { label: "Amenities", id: "amenities" },
  ];

  return (
    <>
      <section className="relative w-full h-[100svh] overflow-hidden bg-[#2A2520]">
        {heroImageRef && (
          <>
            {heroMobileRef ? (
              <>
                <Image
                  src={heroMobileRef}
                  alt={heroImageAlt}
                  fill
                  className="object-cover object-top md:hidden"
                  priority
                  sizes="100vw"
                />
                <Image
                  src={heroImageRef}
                  alt={heroImageAlt}
                  fill
                  className="object-cover object-top hidden md:block"
                  priority
                  sizes="100vw"
                />
              </>
            ) : (
              <Image
                src={heroImageRef}
                alt={heroImageAlt}
                fill
                className="object-cover object-top"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-black/30" />
          </>
        )}
        <div className="absolute bottom-[80px] left-0 right-0 text-center px-10">
          <span className="text-[16px] tracking-[0.2em] uppercase text-white/80 font-semibold mb-4 block">
            {eyebrow}
          </span>
          <h1 className="font-display text-[32px] md:text-[42px] text-white font-semibold leading-[1.2] text-center max-w-4xl mx-auto">
            {headline}
          </h1>
        </div>
      </section>

      {/* Intro & Event Types List */}
      <section className="bg-[#FFFFFF] py-[80px]">
        <SectionReveal>
          <div className="max-w-[560px] mx-auto text-center px-10">
            <div className="flex justify-center mb-8">
              <div className="relative w-18 h-18">
                <Image
                  src="/images/brand/logo-icon.svg"
                  alt="GROVEside icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {eventsData.page_intro_paragraphs?.map((paragraph, i) => (
              <p
                key={i}
                className={`text-[15px] text-[#111] leading-relaxed text-center ${
                  i === 0 ? "mb-5" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Image Gallery Strip */}
      {eventsData.gallery_images && eventsData.gallery_images.length > 0 && (
        <section className="bg-[#FFFFFF] py-[30px]">
          <EventGalleryCarousel images={eventsData.gallery_images} />
        </section>
      )}

      {/* Pricing Section */}
      {eventsData.pricing_heading && eventsData.pricing_paragraphs && (
        <section
          id="pricing"
          className="bg-[#F0EDE8] py-[80px] flex flex-col items-center gap-6 scroll-mt-24 px-5"
        >
          <SectionReveal className="w-full flex justify-center">
            <div className="bg-white rounded-[8px] py-[48px] px-[32px] md:px-[56px] w-full max-w-[950px]">
              <h2 className="font-display text-[38px] text-[#111] font-semibold mb-3">
                {eventsData.pricing_heading}
              </h2>
              {eventsData.pricing_paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-[15px] text-[#111]/80 leading-relaxed ${
                    i === 0 ? "mb-3" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </SectionReveal>
        </section>
      )}

      {/* Versatile Setup Section */}
      {eventsData.versatile_setup_heading &&
        eventsData.versatile_setup_items && (
          <section
            id="setup"
            className="bg-[#F0EDE8] pb-[80px] flex flex-col items-center px-5 scroll-mt-24"
          >
            <SectionReveal className="w-full flex justify-center">
              <div className="bg-white rounded-[8px] py-[48px] px-[32px] md:px-[56px] w-full max-w-[950px]">
                <h2 className="font-display text-[38px] text-[#111] font-semibold mb-2">
                  {eventsData.versatile_setup_heading}
                </h2>
                {eventsData.versatile_setup_intro && (
                  <p className="text-[15px] text-[#111]/80 leading-relaxed mb-8">
                    {eventsData.versatile_setup_intro}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[16px]">
                  {eventsData.versatile_setup_items
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={index} className="flex flex-col gap-[10px]">
                        <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden">
                          <Image
                            src={item.image_ref}
                            alt={item.alt_text}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <p className="text-[13px] text-[#555] leading-snug">
                          {item.caption}
                        </p>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full md:w-[calc(66.666%+8px)] mx-auto">
                  {eventsData.versatile_setup_items
                    .slice(3, 5)
                    .map((item, index) => (
                      <div key={index + 3} className="flex flex-col gap-[10px]">
                        <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden">
                          <Image
                            src={item.image_ref}
                            alt={item.alt_text}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <p className="text-[13px] text-[#555] leading-snug">
                          {item.caption}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </SectionReveal>
          </section>
        )}

      {/* Tailored Proposals */}
      {eventsData.tailored_heading && eventsData.tailored_body && (
        <section className="bg-[#F0EDE8] pb-[80px] flex flex-col items-center px-5">
          <SectionReveal className="w-full flex justify-center">
            <div className="bg-white rounded-[8px] py-[40px] px-[32px] md:px-[56px] w-full max-w-[950px] grid grid-cols-1 md:grid-cols-[160px_1fr] gap-[24px] md:gap-[40px] items-center">
              {eventsData.tailored_image_ref && (
                <div className="relative aspect-[3/4] rounded-[6px] overflow-hidden w-[180px] mx-auto md:mx-0">
                  <Image
                    src={eventsData.tailored_image_ref}
                    alt={
                      eventsData.tailored_image_alt || "GROVEside team member"
                    }
                    fill
                    className="object-cover object-top"
                    sizes="180px"
                  />
                </div>
              )}
              <div>
                <h3 className="font-display text-[28px] text-[#111] font-semibold mb-3 text-center md:text-left">
                  {eventsData.tailored_heading}
                </h3>
                <p className="text-[16px] text-[#111]/80 leading-relaxed text-center md:text-left">
                  {eventsData.tailored_body}
                </p>
              </div>
            </div>
          </SectionReveal>
        </section>
      )}
      {/* Technologies & Amenities Accordion Grid */}
      {technologies && amenities && (
        <section className="bg-[#F0EDE8] pb-[50px] flex flex-col items-center px-5 scroll-mt-24">
          <SectionReveal className="w-full flex justify-center">
            <div className="w-full max-w-[950px] grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start">
              <AccordionInfoCard
                title={technologies.heading || "Technologies"}
                items={technologies.items}
                type="technologies"
              />
              <AccordionInfoCard
                title={amenities.heading || "Amenities"}
                items={amenities.items}
                type="amenities"
              />
            </div>
          </SectionReveal>
        </section>
      )}
    </>
  );
}
