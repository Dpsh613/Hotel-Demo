import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ValuesGrid } from "@/components/sections/ValuesGrid";

import {
  getHeroBySlug,
  getHomePageData,
  getFeatureGroup,
  getValuesData,
} from "@/lib/data/loaders";
import { GsapReveal } from "@/components/animation/GsapReveal";

export default async function Page() {
  const heroData = await getHeroBySlug("home-hero");
  const homeData = await getHomePageData();
  const featuresData = await getFeatureGroup("why-choose");
  const valuesData = await getValuesData();

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
      {featuresData && (
        <GsapReveal direction="up" distance={40} delay={0.1}>
          <FeaturesGrid featureGroup={featuresData} />
        </GsapReveal>
      )}
      {valuesData && valuesData.values?.length > 0 ? (
        <GsapReveal direction="up" distance={40} delay={0.1}>
          <ValuesGrid data={valuesData} />
        </GsapReveal>
      ) : null}
    </main>
  );
}
