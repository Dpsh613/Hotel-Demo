import Link from "next/link";
import Image from "next/image";
import { getCTABySlug } from "@/lib/data/loaders";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "next";

export async function PreFooterCTA() {
  const data = await getCTABySlug("primary-contact");

  if (!data) return null;

  return (
    <section className="bg-[#F0EDE8] py-12 md:py-[80px] md:pb-[150px]">
      <div className="container-content flex flex-col items-center justify-center">
        <SectionReveal className="flex flex-col items-center w-full max-w-[600px] mx-auto">
          {/* Logo Mark */}
          <div className="w-16 h-16 relative flex items-center justify-center mb-2">
            <Image
              src="/images/brand/logo-icon.svg"
              alt="GROVEside mark"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <h2 className="font-display text-[42px] text-[#111] font-semibold text-center mt-4 mb-4">
            {data.heading}
          </h2>

          {data.body && (
            <p className="text-[16px] text-[#111] text-center max-w-[500px] mx-auto mb-8">
              {data.body}
            </p>
          )}

          <Link
            href={(data.button_url || "/") as Route}
            className="bg-[#111] text-white rounded-full px-8 py-3 text-[12px] tracking-[0.1em] uppercase font-medium flex items-center gap-2 hover:bg-[#333] transition-colors"
            target={data.open_in_new_tab ? "_blank" : undefined}
          >
            {data.button_text}
            <ArrowUpRight className="size-4 hover:ml-1" aria-hidden="true" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
