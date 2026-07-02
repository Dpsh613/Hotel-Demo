import { Metadata } from "next";
import { getPrivacyPolicyContent } from "@/lib/markdown";
import {
  getBusinessIdentity,
  getSiteConfig,
  getPrivacyData,
} from "@/lib/data/loaders";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProseContent } from "@/components/common/ProseContent";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [privacyData, identity, siteConfig] = await Promise.all([
    getPrivacyData(),
    getBusinessIdentity(),
    getSiteConfig(),
  ]);

  const businessName = identity?.business_name || "GROVEside";
  const siteUrl = siteConfig?.url || "";

  return {
    title: `${privacyData.page_title} — ${businessName}`,
    description: `Privacy policy and data protection practices for ${businessName}.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/privacy-policy`,
    },
  };
}

export default async function PrivacyPolicyPage() {
  const [privacyData, htmlContent] = await Promise.all([
    getPrivacyData(),
    getPrivacyPolicyContent(),
  ]);

  return (
    <main>
      <PageHeader
        title={privacyData.page_title}
        subtitle={
          <>
            Last updated:{" "}
            <time dateTime={privacyData.last_updated}>
              {formatDate(privacyData.last_updated)}
            </time>
          </>
        }
        variant="minimal"
      />

      <section className="py-20 md:py-32 bg-surface-default">
        <div className="container-content">
          <div className="reading-column mx-auto">
            <ProseContent html={htmlContent} />
          </div>
        </div>
      </section>
    </main>
  );
}
