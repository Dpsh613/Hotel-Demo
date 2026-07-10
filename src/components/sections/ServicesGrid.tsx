import { HomePageData } from "@/types";
import { getAllServices } from "@/lib/data/loaders";
import { ServiceCard } from "../cards/ServiceCard";
import { SectionReveal } from "../animation/SectionReveal";

interface ServicesGridProp {
  data?: HomePageData["services_section"];
}

export async function ServicesGrid({ data }: ServicesGridProp) {
  if (!data || !data.show_section) return null;

  const servicesData = await getAllServices();
  if (!servicesData || !servicesData.services) return null;

  const publishedServices = servicesData.services
    .filter((s) => s.status === "published")
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 3);

  if (publishedServices.length === 0) return null;

  return (
    <section className="bg-surface-at pb-12 md:pb-[30px]">
      <div className="container-content">
        <div className="bg-white rounded-[10px] md:rounded-[12px] p-6 md:p-12 lg:p-16">
          {data.heading && (
            <SectionReveal className="text-center lg:text-left mb-10 md:mb-14">
              <h2 className="text-[32px] md:text-[40px] text-[#111] font-display font-semibold mb-6">
                {data.heading.title}
              </h2>
              {data.intro_text && (
                <p className="text-[15px] md:text-[16px] text-[#666] leading-relaxed max-w-full lg:max-w-[50%]">
                  {data.intro_text}
                </p>
              )}
            </SectionReveal>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
            {publishedServices.map((service, index) => (
              <SectionReveal
                key={service.slug}
                delay={index * 0.15}
                className="h-full"
              >
                <ServiceCard
                  title={service.card_title}
                  tagline={service.card_tagline}
                  ctaText={service.card_cta_text}
                  ctaHref={`/${service.slug}`}
                  imageSrc={service.card_image_ref || "/images/placeholder.jpg"}
                  imageAlt={service.card_image_alt || service.card_title}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
