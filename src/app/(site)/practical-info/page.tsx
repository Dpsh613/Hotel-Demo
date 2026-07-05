import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPracticalPageData,
  getBusinessContact,
  getAllServices,
} from "@/lib/data/loaders";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";
import { InfoBlock } from "@/components/common/InfoBlock";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPracticalPageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title || data.page_title,
    description: data.meta_description || "",
    path: "/practical-info",
  });
}

export default async function PracticalInfoPage() {
  const [data, contact, allServices] = await Promise.all([
    getPracticalPageData(),
    getBusinessContact(),
    getAllServices(),
  ]);

  if (!data) notFound();

  // If distance-table block exists but lacks content, inject from contact data
  const infoBlocks = data.info_blocks.map((block) => {
    if (
      block.content_type === "distance-table" &&
      contact?.proximity_points &&
      (!block.content ||
        (Array.isArray(block.content) && block.content.length === 0))
    ) {
      return { ...block, content: contact.proximity_points };
    }
    return block;
  });

  return (
    <main className="bg-[#F0EDE8] min-h-screen pt-[180px] pb-4">
      <div className="container-content w-full">
        <div className="max-w-[950px] mx-auto">
          {/* Header */}
          <SectionReveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
              <h1 className="font-display text-[38px] text-[#111] font-semibold">
                {data.page_title}
              </h1>
              {data.hero_cta_ref && (
                <Link
                  href="/contact"
                  className="bg-[#111] text-white px-8 py-3 rounded-full text-[12px] uppercase tracking-widest font-semibold hover:bg-black/80 transition-colors flex items-center gap-2"
                >
                  GET IN TOUCH <span className="text-[14px]">↗</span>
                </Link>
              )}
            </div>
            <hr className="border-[#111] mb-12" />
          </SectionReveal>

          {/* Info Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infoBlocks.map((block, index) => (
              <SectionReveal
                key={block.slug}
                delay={index * 0.1}
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <InfoBlock
                  iconRef={block.icon_ref || block.slug}
                  heading={block.heading}
                  contentType={block.content_type}
                  content={block.content}
                  note={block.note}
                />
              </SectionReveal>
            ))}
          </div>

          {/* Our Services Quicklinks */}
          {data.services_quicklinks && (
            <SectionReveal delay={0.4}>
              <div className="mt-32 text-center">
                <h2 className="font-display text-[36px] font-semibold text-[#111] mb-4">
                  {data.services_quicklinks.heading}
                </h2>
                {data.services_quicklinks.intro && (
                  <p className="text-[16px] text-[#111]/80 mb-8 max-w-[650px] mx-auto">
                    {data.services_quicklinks.intro}
                  </p>
                )}
                <div className="flex flex-wrap justify-center gap-8 text-[13px] uppercase tracking-[0.12em] font-semibold text-[#111]">
                  <Link
                    href="/meeting-spaces"
                    className="flex items-center gap-1 border-b border-transparent hover:border-[#111] pb-0.5 transition-all"
                  >
                    MEETING SPACES{" "}
                    <span className="text-[14px] font-normal leading-none ml-0.5">
                      ↗
                    </span>
                  </Link>
                  <Link
                    href="/business-events"
                    className="flex items-center gap-1 border-b border-transparent hover:border-[#111] pb-0.5 transition-all"
                  >
                    BUSINESS EVENTS{" "}
                    <span className="text-[14px] font-normal leading-none ml-0.5">
                      ↗
                    </span>
                  </Link>
                  <Link
                    href="/stay-the-night"
                    className="flex items-center gap-1 border-b border-transparent hover:border-[#111] pb-0.5 transition-all"
                  >
                    STAY THE NIGHT{" "}
                    <span className="text-[14px] font-normal leading-none ml-0.5">
                      ↗
                    </span>
                  </Link>
                </div>
              </div>
            </SectionReveal>
          )}
        </div>
      </div>
    </main>
  );
}
