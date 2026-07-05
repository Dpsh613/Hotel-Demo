import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryPageData, getTeamMemberBySlug } from "@/lib/data/loaders";
import { TimelineChapter } from "@/components/common/TimelineChapter";
import { FounderSignature } from "@/components/common/FounderSignature";
import { SectionReveal } from "@/components/animation/SectionReveal";

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStoryPageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title || data.page_title,
    description: data.meta_description || "",
    path: "/our-story",
    ogImage: data.hero_image_ref,
  });
}

export default async function OurStoryPage() {
  const story = await getStoryPageData();

  if (!story) notFound();

  // Founder details
  const founder =
    story.founder_note?.show && story.founder_note.member_ref
      ? await getTeamMemberBySlug(story.founder_note.member_ref)
      : null;

  return (
    <main className="bg-[#F0EDE8]">
      <div className="pt-32 md:pt-50 pb-8 text-center px-6">
        <span className="text-[16px] tracking-[0.1em] uppercase text-[#111] font-normal mb-4 block text-center">
          {story.page_eyebrow || story.page_title}
        </span>
        <h1 className="font-display text-[46px] md:text-[42px] text-[#111] font-semibold text-center leading-[1.1]">
          {story.page_subtitle}
        </h1>
      </div>

      <section
        className="relative max-w-6xl mx-auto pt-4 pb-10 md:pt-8 md:pb-20 px-6 md:px-0"
        id="timeline"
      >
        {/* The vertical center spine line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#111] -translate-x-1/2" />

        {story.chapters.map((chapter: any, index: number) => (
          <SectionReveal key={chapter.slug} delay={0.2}>
            <TimelineChapter
              chapter={chapter}
              side={chapter.image_position}
              isLast={index === story.chapters.length - 1}
            />
          </SectionReveal>
        ))}
      </section>

      {founder && founder.personal_note && (
        <SectionReveal>
          <FounderSignature
            imageRef={founder.image_ref}
            imageAlt={founder.image_alt}
            eyebrow={founder.personal_note.eyebrow}
            paragraphs={founder.personal_note.paragraphs}
            closingSalutation={founder.personal_note.closing_salutation}
            signatureName={founder.signature_name}
            signatureTitle={founder.signature_title}
          />
        </SectionReveal>
      )}
    </main>
  );
}
