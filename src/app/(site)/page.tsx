import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

import { getHeroBySlug, getHomePageData } from "@/lib/data/loaders";
import { GsapReveal } from "@/components/animation/GsapReveal";

export default async function Page() {
  const heroData = await getHeroBySlug("home-hero");
  const homeData = await getHomePageData();

  if (!heroData || !homeData) return null;
  return (
    <main>
      <HeroSlideshow hero={heroData} />
      <GsapReveal direction="up" distance={40}>
        <AboutSection data={homeData.about_section} />
      </GsapReveal>
      <GsapReveal direction="up" distance={40} delay={0.1}>
        <ServicesGrid data={homeData.services_section} />
      </GsapReveal>
    </main>
  );
}
