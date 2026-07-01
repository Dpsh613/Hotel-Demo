import { getBusinessIdentity, getFeaturesConfig } from "@/lib/data/loaders";

export async function PreHeaderBar() {
  const features = await getFeaturesConfig();
  if (!features?.pre_header_bar) {
    return null;
  }

  const identity = await getBusinessIdentity();
  if (!identity?.brand_tagline) {
    return null;
  }

  return (
    <div
      role="banner"
      aria-label="Brand tagline"
      className="bg-surface-dark text-text-on-dark h-8 flex items-center justify-center text-[10px] md:text-xs tracking-widest uppercase font-medium"
    >
      {identity.brand_tagline}
    </div>
  );
}
