import Image from "next/image";
import { SectionReveal } from "@/components/animation/SectionReveal";
import type { ValuesData } from "@/types/components";

interface ValuesGridProps {
  data: ValuesData;
}

export function ValuesGrid({ data }: ValuesGridProps) {
  if (!data || !data.values || data.values.length === 0) return null;

  return (
    <section className="bg-[#F0EDE8] py-6 md:py-[30px]">
      <div className="container-content">
        <SectionReveal className="text-center md:text-left mb-5">
          <p className="text-[20px] md:text-[20px] tracking-[0.18em] uppercase text-[#111] mb-2 font-semibold">
            OUR VALUES
          </p>
          <h2 className="font-display text-[28px] md:text-[36px] text-[#111] font-semibold">
            What drive us at our core
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
          {data.values.map((value, index) => (
            <SectionReveal key={value.slug} delay={index * 0.1}>
              <div className="border border-[#E0DDD8] rounded-[8px] bg-white h-full flex flex-col group p-2">
                <div className="relative aspect-[3/2] overflow-hidden shrink-0 rounded-t-[8px] rounded-b-[8px]">
                  {value.image_ref && (
                    <Image
                      src={value.image_ref}
                      alt={value.label}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="pt-4 px-2 pb-2 flex flex-col flex-1">
                  <h3 className="text-[17px] font-semibold text-[#111] mb-2 font-display">
                    {value.label}
                  </h3>
                  <p className="text-[13px] text-[#111] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
