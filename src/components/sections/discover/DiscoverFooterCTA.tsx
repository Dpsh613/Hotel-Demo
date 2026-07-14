import { Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";

export function DiscoverFooterCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border border-[#E0DDD8] rounded-[12px] p-6 lg:px-10 py-6 shadow-sm mt-10">
      <div className="flex items-center gap-5 text-[#111]">
        <div className="bg-[#F6F4F0] p-3 rounded-full shrink-0">
          <Leaf className="w-6 h-6 text-[#C46D52]" strokeWidth={1.5} />
        </div>
        <div>
          <h4 className="font-serif text-[18px] md:text-[22px] font-medium leading-snug">
            Ready to create beautiful memories?
          </h4>
          <p className="text-[14px] md:text-[15px] text-[#666] mt-1">
            We can&apos;t wait to welcome you to CelestialEve.
          </p>
        </div>
      </div>

      <Link
        href={"/contact" as Route}
        className="inline-flex items-center gap-2 bg-[#423E32] text-white rounded-[4px] py-3.5 px-7 transition-transform duration-[2s] ease-out hover:scale-105  whitespace-nowrap shrink-0"
      >
        <span className="text-[11px] tracking-[0.15em] font-semibold uppercase">
          Plan Your Stay
        </span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
