import { PreHeaderBar } from "@/components/layout/PreHeaderBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";
import { getFeaturesConfig } from "@/lib/data/loaders";
import { GsapReveal } from "@/components/animation/GsapReveal";
import { ConditionalPreFooter } from "@/components/layout/ConditionalPreFooter";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const features = await getFeaturesConfig();

  return (
    <div className="flex min-h-screen flex-col">
      <PreHeaderBar />
      <SiteHeader />
      <main id="content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      <ConditionalPreFooter>
        <GsapReveal direction="up" distance={40} triggerOffset="top 90%">
          <PreFooterCTA />
        </GsapReveal>
      </ConditionalPreFooter>

      <div className="bg-[#F0EDE8] pb-6 md:pb-8">
        <div className="container-content">
          <div className="bg-[#171717] rounded-[16px] md:rounded-[10px] overflow-hidden">
            <GsapReveal direction="up" distance={30} triggerOffset="top 90%">
              {features?.newsletter_signup && <NewsletterSection />}
            </GsapReveal>
            <GsapReveal direction="up" distance={30} triggerOffset="top 95%">
              <SiteFooter />
            </GsapReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
