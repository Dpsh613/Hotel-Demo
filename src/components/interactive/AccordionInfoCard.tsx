"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  label: string;
  descriptor?: string;
  body?: string;
  icon_ref?: string;
}

interface AccordionInfoCardProps {
  title: string;
  items: Item[];
  type: "technologies" | "amenities";
}

export function AccordionInfoCard({
  title,
  items,
  type,
}: AccordionInfoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#FFFFFF] rounded-[8px] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-[32px] py-[32px] cursor-pointer text-left"
        aria-expanded={isOpen}
      >
        <h3 className="font-display text-[26px] text-[#111] font-semibold">
          {title}
        </h3>
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#111] text-white shrink-0 transition-transform duration-300">
          {isOpen ? <X className="size-4" /> : <Plus className="size-4" />}
        </div>
      </button>

      {/* Expandable Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-[28px] pb-[28px] flex flex-col">
              {items.map((item, index) => {
                const IconComponent =
                  (item.icon_ref
                    ? (LucideIcons as any)[item.icon_ref]
                    : null) || LucideIcons.Check;
                const isLast = index === items.length - 1;

                return (
                  <div
                    key={item.label}
                    className={`flex items-start gap-[12px] py-[8px] ${
                      !isLast ? "border-b border-[#F0EDE8]" : ""
                    } ${type === "amenities" ? "py-[10px]" : ""}`}
                  >
                    <IconComponent
                      className="size-5 text-[#888] shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col">
                      <span className="text-[15px] font-medium text-[#111]">
                        {item.label}
                      </span>
                      {type === "technologies" && item.descriptor && (
                        <span className="text-[14px] text-[#555]">
                          {item.descriptor}
                        </span>
                      )}
                      {type === "amenities" && item.body && (
                        <span className="text-[14px] text-[#555] leading-snug mt-0.5">
                          {item.body}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
