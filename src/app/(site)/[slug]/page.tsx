import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllServices,
  getServiceBySlug,
  getSiteConfig,
  getFeaturesConfig,
  getSpacesByServiceSlug,
  getRoomsByServiceSlug,
} from "@/lib/data/loaders";
import { PageHeader } from "@/components/sections/PageHeader";
import { QuickNavBar } from "@/components/interactive/QuickNavBar";
import { buildMetadata } from "@/lib/seo";
import { SpaceCard } from "@/components/cards/SpaceCard";
import { RoomCard } from "@/components/cards/RoomCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const data = await getAllServices();
  if (!data || !data.services) return [];

  return data.services
    .filter(
      (service) =>
        ![
          "meeting-spaces",
          "stay-the-night",
          "business-events",
          "our-story",
          "practical-info",
          "contact",
        ].includes(service.slug),
    )
    .map((service) => ({
      slug: service.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.meta_title || service.page_title,
    description: service.meta_description || "",
    path: `/${slug}`,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const [service, features, spaces, rooms] = await Promise.all([
    getServiceBySlug(slug),
    getFeaturesConfig(),
    getSpacesByServiceSlug(slug),
    getRoomsByServiceSlug(slug),
  ]);

  if (!service) {
    notFound();
  }

  // Define variant based on service slug as requested in the prompt
  // (e.g., "Business Events only" uses 'split', others use 'standard')
  const headerVariant = slug === "business-events" ? "split" : "standard";

  const heroImage = service.hero_image_ref
    ? {
        src: service.hero_image_ref,
        alt: service.hero_image_alt || service.page_title,
      }
    : undefined;

  return (
    <>
      <PageHeader
        title={service.page_title}
        subtitle={service.page_subtitle}
        heroImage={heroImage}
        variant={headerVariant}
      />

      {features?.quick_navigation &&
        service.quick_nav_items &&
        service.quick_nav_items.length > 0 && (
          <QuickNavBar items={service.quick_nav_items} />
        )}

      {/* 
        Future implementation: Render specific sections dynamically 
        based on service data.
      */}
      <div className="container-content py-section">
        <p className="text-body-large text-text-secondary max-w-3xl mb-16">
          {service.page_intro}
        </p>

        {/* Meeting Spaces grid */}
        {spaces.length > 0 && (
          <section id="spaces" className="mb-24 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spaces.map((space) => (
                <SpaceCard key={space.slug} space={space} />
              ))}
            </div>
          </section>
        )}

        {/* Accommodation Rooms grid */}
        {rooms.length > 0 && (
          <section id="rooms" className="mb-24 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard
                  key={room.slug}
                  room={room}
                  showPricing={!!features?.pricing_visible}
                />
              ))}
            </div>
          </section>
        )}

        {/* Remaining Mock sections for QuickNav demonstration */}
        {service.quick_nav_items?.map((item) => {
          if (item.id === "spaces" || item.id === "rooms") return null;
          return (
            <section
              key={item.id}
              id={item.id}
              className="min-h-[50vh] py-section border-t border-border-subtle mt-12 scroll-mt-24"
            >
              <h2 className="text-section-h2 font-display text-text-primary mb-6">
                {item.label} Section
              </h2>
              <p className="text-body-large text-text-secondary max-w-2xl">
                This is a demonstration section for the {item.label} anchor. In
                the full implementation, this will be replaced by the actual
                dynamic section content.
              </p>
            </section>
          );
        })}
      </div>
    </>
  );
}
