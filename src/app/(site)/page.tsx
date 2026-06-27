import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { getHeroBySlug } from "@/lib/data/loaders";

export default async function Page() {
  const heroData = await getHeroBySlug("home-hero");
  if (!heroData) return null;
  return (
    <div>
      <HeroSlideshow hero={heroData} />
    </div>
  );
}
