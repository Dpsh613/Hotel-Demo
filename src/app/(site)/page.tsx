import { Metadata } from "next";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
// 1. Import the new TestimonialsCarousel component (adjust path if needed)
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FAQSection } from "@/components/sections/FAQSection";
import { GsapReveal } from "@/components/animation/GsapReveal";

import {
  getHeroBySlug,
  getHomePageData,
  getFeatureGroup,
  getValuesData,
  // 2. Use getTestimonialsData instead of getAllTestimonials so you get the section headings
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
  // 3. Fetch the full testimonial data object
  const testimonialsData = await getTestimonialsData();

  if (!heroData || !homeData) return null;

  // Optional: Filter testimonials to only include ones where `show` is true
  const activeTestimonials =
    testimonialsData?.testimonials?.filter((t) => t.show) || [];

  return (
    <main>
      <HeroSlideshow hero={heroData} />

      <GsapReveal direction="up" distance={40}>
        <AboutSection data={homeData.about_section} />
      </GsapReveal>

      <GsapReveal direction="up" distance={40} delay={0.1}>
        <ServicesGrid data={homeData.services_section} />
      </GsapReveal>

      {featuresData && (
        <GsapReveal direction="up" distance={40} delay={0.1}>
          <FeaturesGrid featureGroup={featuresData} />
        </GsapReveal>
      )}

      {/* 4. Testimonials placed just above Values */}
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
