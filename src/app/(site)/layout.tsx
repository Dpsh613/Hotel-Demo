import { PreHeaderBar } from "@/components/layout/PreHeaderBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";
import {
  getFeaturesConfig,
  getFAQData,
  getBusinessContact,
  getSocialPlatforms,
} from "@/lib/data/loaders";
import { GsapReveal } from "@/components/animation/GsapReveal";
import { ConditionalPreFooter } from "@/components/layout/ConditionalPreFooter";

// 👇 THIS IS THE ONLY LINE THAT CHANGED 👇
import { FloatingContactWidget } from "@/components/interactive/floating-contact/FloatingContactWidget";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data in parallel for speed
  const [features, faqData, contactData, socialData] = await Promise.all([
    getFeaturesConfig(),
    getFAQData(),
    getBusinessContact(),
    getSocialPlatforms(),
  ]);

  return (
    <div className="flex min-h-screen flex-col relative">
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

      {/* --- INJECT THE WIDGET HERE --- */}
      {features?.floating_contact_widget && (
        <FloatingContactWidget
          faqData={faqData}
          contact={contactData}
          social={socialData}
        />
      )}
    </div>
  );
}
