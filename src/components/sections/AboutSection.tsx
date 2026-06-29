import { HomePageData } from "@/types";
import { SectionReveal } from "@/components/animation/SectionReveal";

interface AboutSectionProps {
  data?: HomePageData["about_section"];
}

export function AboutSection({ data }: AboutSectionProps) {
  if (!data || !data.show_section) return null;

  return (
    <section className="py-24 md:py-[120px] bg-surface-alt">
      <div className="container-content">
        <SectionReveal className="mx-auto max-w-[900px] flex flex-col items-center text-center">
          <span className="text-[14px] font-semibold uppercase tracking-[0.15em] text-text-primary mb-12">
            Where work meets comfort
          </span>

          <div className="space-y-8 md:space-y-10 text-[20px] md:text-[20px] lg:text-[30px] font-display font-semibold text-text-primary leading-[1.6]">
            {data.heading && <h2 className="font-display">{data.heading}</h2>}
            {data.body_paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
