import { getFAQData, getFeaturesConfig } from "@/lib/data/loaders";
import { parseInlineMarkdown } from "@/lib/markdown";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionReveal } from "../animation/SectionReveal";
import { ProseContent } from "@/components/common/ProseContent";
import { FAQTabbedSection } from "./FAQTabbedSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export async function FAQSection() {
  const [data, features] = await Promise.all([
    getFAQData(),
    getFeaturesConfig(),
  ]);

  if (!features.faq_section || !data) return null;

  const {
    section_heading,
    intro_text,
    display_style = "accordion",
    faq_groups,
  } = data;

  // Filter groups with zero items and sort items within groups
  const filteredGroups = faq_groups
    .map((group) => ({
      ...group,
      items: [...group.items].sort((a, b) => a.sort_order - b.sort_order),
    }))
    .filter((group) => group.items.length > 0);

  if (filteredGroups.length === 0) return null;

  // Pre-render answers for all groups in parallel
  const preRenderedAnswers: Record<string, string> = {};
  const renderPromises = filteredGroups.flatMap((group) =>
    group.items.map(async (item, i) => {
      const html = await parseInlineMarkdown(item.answer);
      preRenderedAnswers[`${group.slug}-${i}`] = html;
    }),
  );
  await Promise.all(renderPromises);

  return (
    <SectionWrapper background="default">
      <SectionReveal>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-section-h2 text-text-primary mb-4">
              {section_heading}
            </h2>
            {intro_text && (
              <p className="text-body-large text-text-secondary">
                {intro_text}
              </p>
            )}
          </div>

          {display_style === "tabbed" ? (
            <FAQTabbedSection
              groups={filteredGroups}
              preRenderedAnswers={preRenderedAnswers}
            />
          ) : (
            <div className="space-y-12">
              {filteredGroups.map((group, groupIdx) => (
                <div key={group.slug}>
                  {filteredGroups.length > 1 && (
                    <h3
                      className={cn(
                        "text-card-h3 text-text-primary mb-4",
                        groupIdx > 0 ? "mt-8" : "mt-0",
                      )}
                    >
                      {group.heading}
                    </h3>
                  )}

                  {display_style === "open-list" ? (
                    <div className="space-y-0">
                      {group.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="mb-8 pb-8 border-b border-border-subtle last:border-0"
                        >
                          <h3 className="text-card-h3 text-text-primary">
                            {item.question}
                          </h3>
                          <div className="mt-3">
                            <div
                              className="text-body-large text-text-secondary"
                              dangerouslySetInnerHTML={{
                                __html:
                                  preRenderedAnswers[
                                    `${group.slug}-${itemIdx}`
                                  ] || "",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Default: Accordion */
                    <Accordion type="multiple" className="w-full">
                      {group.items.map((item, itemIdx) => (
                        <AccordionItem
                          key={itemIdx}
                          value={`item-${group.slug}-${itemIdx}`}
                          className="border-border-subtle"
                        >
                          <AccordionTrigger className="text-left font-semibold text-text-primary hover:text-text-secondary hover:no-underline py-4 text-base">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-text-secondary text-body-base pb-4 pt-0 leading-relaxed">
                            <ProseContent
                              html={
                                preRenderedAnswers[
                                  `${group.slug}-${itemIdx}`
                                ] || ""
                              }
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionReveal>
    </SectionWrapper>
  );
}
