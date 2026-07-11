"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FAQGroup } from "@/types";

interface FAQTabbedSectionProps {
  groups: FAQGroup[];
  preRenderedAnswers: Record<string, string>; // key format: `${groupSlug}-${itemIndex}`
}

export function FAQTabbedSection({
  groups,
  preRenderedAnswers,
}: FAQTabbedSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  if (!groups || groups.length === 0) return null;

  const activeGroup = groups[activeTab];

  if (!activeGroup) return null;

  return (
    <div className="w-full">
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="FAQ Categories"
        className="flex border-b border-border-subtle overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 mb-8"
        style={{ scrollbarWidth: "none" }}
      >
        {groups.map((group, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={group.slug}
              id={`faq-tab-${group.slug}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`faq-panel-${group.slug}`}
              onClick={() => setActiveTab(index)}
              className={cn(
                "py-4 px-6 font-display font-medium text-sm border-b-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 cursor-pointer",
                isActive
                  ? "border-brand-primary text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              {group.heading}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup.slug}
          id={`faq-panel-${activeGroup.slug}`}
          role="tabpanel"
          aria-labelledby={`faq-tab-${activeGroup.slug}`}
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }
          }
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="outline-none"
        >
          {activeGroup.items.length === 0 ? (
            <p className="text-text-secondary text-sm italic">
              No questions in this category.
            </p>
          ) : (
            <div className="space-y-0">
              {activeGroup.items.map((item, itemIdx) => {
                const answerKey = `${activeGroup.slug}-${itemIdx}`;
                const answerHtml = preRenderedAnswers[answerKey] || "";

                return (
                  <div
                    key={itemIdx}
                    className="mb-8 pb-8 border-b border-border-subtle last:border-0"
                  >
                    <h3 className="text-card-h3 text-text-primary">
                      {item.question}
                    </h3>
                    <div className="mt-3">
                      <div
                        className="text-body-large text-text-secondary prose-p:text-text-secondary prose-a:text-brand-primary prose-a:underline hover:prose-a:no-underline"
                        dangerouslySetInnerHTML={{ __html: answerHtml }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
