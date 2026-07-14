import { Metadata } from "next";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { AboutSection } from "@/components/sections/AboutSection";
import { DiscoverSection } from "@/components/sections/DiscoverSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FAQSection } from "@/components/sections/FAQSection";
import { GsapReveal } from "@/components/animation/GsapReveal";

import {
  getHeroBySlug,
  getHomePageData,
  getFeatureGroup,
  getValuesData,
  getDiscoverSection,
  getTestimonialsData,
} from "@/lib/data/loaders";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title,
    description: data.meta_description,
    path: "/",
  });
}

export default async function Page() {
  const heroData = await getHeroBySlug("home-hero");
  const homeData = await getHomePageData();
  const featuresData = await getFeatureGroup("why-choose");
  const valuesData = await getValuesData();

  // FIXED: Changed from "discover-sections" to "discover-section" to correctly match JSON
  const discoverData = await getDiscoverSection("discover-sections");

  const testimonialsData = await getTestimonialsData();

  if (!heroData || !homeData) return null;

  const activeTestimonials =
    testimonialsData?.testimonials?.filter((t) => t.show) || [];

  return (
    <main>
      <HeroSlideshow hero={heroData} />

      <GsapReveal direction="up" distance={40}>
        <AboutSection data={homeData.about_section} />
      </GsapReveal>

      {discoverData && (
        <GsapReveal direction="up" distance={40} delay={0.1}>
          <DiscoverSection data={discoverData} />
        </GsapReveal>
      )}

      {featuresData && (
        <GsapReveal direction="up" distance={40} delay={0.1}>
          <FeatureSection featureGroup={featuresData} />
        </GsapReveal>
      )}

      {testimonialsData && activeTestimonials.length > 0 && (
        <GsapReveal direction="up" distance={40} delay={0.1}>
          <TestimonialsCarousel
            data={testimonialsData}
            items={activeTestimonials}
          />
        </GsapReveal>
      )}

      {valuesData && valuesData.values?.length > 0 ? (
        <GsapReveal direction="up" distance={40} delay={0.1}>
          <ValuesGrid data={valuesData} />
        </GsapReveal>
      ) : null}

      <GsapReveal direction="up" distance={40} delay={0.1}>
        <FAQSection />
      </GsapReveal>
    </main>
  );
}
