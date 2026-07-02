import { cache } from "react"; // cache so it wont load on every request.
import { promises as fs, read } from "fs"; // file system which is built in node - it can read/create/write and delete file.
import path from "path"; // built in which reads/creates path thats better than "data/components/hero.json" as it could break.
import {
  BusinessIdentity,
  BusinessContact,
  BusinessHours,
  SocialPlatform,
  TeamMember,
  HomePageData,
  HeroContent,
  FeatureGroup,
  OnePriceConcept,
  SpaceData,
  RoomData,
  ServiceData,
  ValuesData,
  SiteConfig,
  FeaturesConfig,
  NavigationConfig,
  NewsletterData,
  CTABlock,
  Banner,
  CookiesData,
} from "@/types"; // imported interface/ shape of object.

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_DIR = path.join(process.cwd(), "config");
// simply means data directory of the current workFeaturesConfigll return type T bcs file reading is async.

// try block -- attempt to read the file path and store the content then
// return json = then convert the text into object- In the form of T Type.

// catch block -- if file is missing or invalid json or permission error -- show error
// ---------------------readjson async function explanation -------------------

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

// Business loaders

export const getBusinessIdentity = cache(
  async (): Promise<BusinessIdentity> => {
    return readJson<BusinessIdentity>(
      path.join(DATA_DIR, "business", "identity.json"),
      {} as BusinessIdentity,
    );
  },
);

export const getBusinessContact = cache(async (): Promise<BusinessContact> => {
  return readJson<BusinessContact>(
    path.join(DATA_DIR, "business", "contact.json"),
    {} as BusinessContact,
  );
});

export const getBusinessHours = cache(async (): Promise<BusinessHours> => {
  return readJson<BusinessHours>(
    path.join(DATA_DIR, "business", "hours.json"),
    {} as BusinessHours,
  );
});

export const getSocialPlatforms = cache(
  async (): Promise<{ platforms: SocialPlatform[] }> => {
    return readJson<{ platforms: SocialPlatform[] }>(
      path.join(DATA_DIR, "business", "social.json"),
      { platforms: [] },
    );
  },
);

export const getTeam = cache(async (): Promise<{ members: TeamMember[] }> => {
  return readJson<{ members: TeamMember[] }>(
    path.join(DATA_DIR, "business", "team.json"),
    { members: [] },
  );
});

// Page loaders
// 1. about section

export const getHomePageData = cache(async (): Promise<HomePageData> => {
  return readJson<HomePageData>(
    path.join(DATA_DIR, "pages", "home.json"),
    {} as HomePageData,
  );
});

// 2. services

export const getAllServices = cache(
  async (): Promise<{ services: ServiceData[] }> => {
    return readJson<{ services: ServiceData[] }>(
      path.join(DATA_DIR, "pages", "services.json"),
      { services: [] },
    );
  },
);

export const getServiceBySlug = cache(
  async (slug: string): Promise<ServiceData | null> => {
    const data = await getAllServices();
    if (!data || !data.services) return null;
    return data.services.find((s) => s.slug === slug) || null;
  },
);

export const getOnePriceConcept = cache(
  async (slug: string): Promise<OnePriceConcept | null> => {
    const data = await readJson<{ one_price_concepts?: OnePriceConcept[] }>(
      path.join(DATA_DIR, "pages", "services.json"),
      { one_price_concepts: [] },
    );
    if (!data || !data.one_price_concepts) return null;
    return data.one_price_concepts.find((c) => c.service_slug === slug) || null;
  },
);

// meeting-spaces-page
export const getAllSpaces = cache(
  async (): Promise<{ spaces: SpaceData[] }> => {
    return readJson<{ spaces: SpaceData[] }>(
      path.join(DATA_DIR, "pages", "spaces.json"),
      { spaces: [] },
    );
  },
);

export const getSpacesByServiceSlug = cache(
  async (slug: string): Promise<SpaceData[]> => {
    const data = await getAllSpaces();
    if (!data || !data.spaces) return [];
    return data.spaces.filter((s) => s.parent_service_slug === slug);
  },
);

// rooms-page
export const getAllRooms = cache(async (): Promise<{ rooms: RoomData[] }> => {
  return readJson<{ rooms: RoomData[] }>(
    path.join(DATA_DIR, "pages", "rooms.json"),
    { rooms: [] },
  );
});

export const getRoomsByServiceSlug = cache(
  async (slug: string): Promise<RoomData[]> => {
    const data = await getAllRooms();
    if (!data || !data.rooms) return [];
    return data.rooms.filter((r) => r.parent_service_slug === slug);
  },
);

// Components loaders
// HeroSlideShow Component

// --------------------getHeroByslug function explaination -------------------

// getHeroBySlug = cache - creates loaderand wrapping it in react cache
// Promise<HeroContent | null> - either heroContent or null
// await readJson<{ heroes: HeroContent[] } - T becomes - {heroes:HeroCOntnet[] in this case
//  path.join(DATA_DIR, "components", "hero.json") - Dir/data/components/hero.json
//if (!data || !data.heroes) return null - if there is no data or no heroes in data return null  ..

export const getHeroBySlug = cache(
  async (slug: string): Promise<HeroContent | null> => {
    const data = await readJson<{ heroes: HeroContent[] }>(
      path.join(DATA_DIR, "components", "hero.json"),
      { heroes: [] },
    );
    if (!data || !data.heroes) return null;
    return data.heroes.find((h) => h.slug === slug) || null;
  },
);

export const getCTABySlug = cache(
  async (slug: string): Promise<CTABlock | null> => {
    const data = await readJson<{ ctas: CTABlock[] }>(
      path.join(DATA_DIR, "components", "cta.json"),
      { ctas: [] },
    );
    if (!data || !data.ctas) return null;
    return data.ctas.find((c) => c.slug === slug) || null;
  },
);

// feature component
export const getFeatureGroup = cache(
  async (slug: string): Promise<FeatureGroup | null> => {
    const data = await readJson<{ feature_groups: FeatureGroup[] }>(
      path.join(DATA_DIR, "components", "features.json"),
      { feature_groups: [] },
    );
    if (!data || !data.feature_groups) return null;
    return data.feature_groups.find((f) => f.slug === slug) || null;
  },
);

// values component

export const getValuesData = cache(async (): Promise<ValuesData> => {
  return readJson<ValuesData>(
    path.join(DATA_DIR, "components", "values.json"),
    {} as ValuesData,
  );
});

export const getNewsletterData = cache(async (): Promise<NewsletterData> => {
  return readJson<NewsletterData>(
    path.join(DATA_DIR, "components", "newsletter.json"),
    {} as NewsletterData,
  );
});

export const getActiveBanners = cache(async (): Promise<Banner[]> => {
  const data = await readJson<{ banners: Banner[] }>(
    path.join(DATA_DIR, "components", "banners.json"),
    { banners: [] },
  );
  if (!data || !data.banners) return [];

  const now = new Date();

  return data.banners.filter((b) => {
    if (!b.show) return false;

    if (b.start_date) {
      const start = new Date(b.start_date);
      if (start > now) return false;
    }

    if (b.end_date) {
      const end = new Date(b.end_date);
      if (end < now) return false;
    }

    return true;
  });
});

export const getCookiesData = cache(async (): Promise<CookiesData> => {
  return readJson<CookiesData>(
    path.join(DATA_DIR, "legal", "cookies.json"),
    {} as CookiesData,
  );
});

// Config loaders

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  return readJson<SiteConfig>(
    path.join(CONFIG_DIR, "site.config.json"),
    {} as SiteConfig,
  );
});

export const getFeaturesConfig = cache(async (): Promise<FeaturesConfig> => {
  return readJson<FeaturesConfig>(
    path.join(CONFIG_DIR, "features.config.json"),
    {} as FeaturesConfig,
  );
});

export const getNavigationConfig = cache(
  async (): Promise<NavigationConfig> => {
    return readJson<NavigationConfig>(
      path.join(CONFIG_DIR, "navigation.config.json"),
      {} as NavigationConfig,
    );
  },
);
