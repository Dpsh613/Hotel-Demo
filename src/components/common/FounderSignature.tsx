"use client";

import Image from "next/image";

export interface FounderSignatureProps {
  imageRef?: string;
  imageAlt?: string;
  eyebrow?: string;
  paragraphs?: string[];
  closingSalutation?: string;
  signatureName: string;
  signatureTitle: string;
}

export function FounderSignature({
  imageRef,
  imageAlt,
  eyebrow,
  paragraphs = [],
  closingSalutation,
  signatureName,
  signatureTitle,
}: FounderSignatureProps) {
  return (
    <section className="bg-[linear-gradient(to_bottom,#F0EDE8_0%,white_15%,white_85%,#F0EDE8_100%)] py-8 md:py-32 px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[60px] items-start">
          {/* Left Column: Image */}
          <div className="w-[280px] shrink-0 aspect-[3/4] rounded-lg overflow-hidden relative bg-[#E8E4DC] mx-auto md:mx-0">
            {imageRef && (
              <Image
                fill
                src={imageRef}
                alt={imageAlt || signatureName}
                className="object-cover object-top"
              />
            )}
          </div>

          {/* Right Column: Text */}
          <div className="pt-2 text-center md:text-left">
            {eyebrow && (
              <span className="text-[16px] tracking-[0.14em] uppercase text-[#111] mb-6 block">
                {eyebrow}
              </span>
            )}

            <div className="mb-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[18px] text-[#111] leading-relaxed font-semibold font-display ${i === paragraphs.length - 1 ? "" : "mb-4"}`}
                >
                  {p}
                </p>
              ))}
            </div>

            <div>
              {closingSalutation && (
                <p className="text-[18px] text-[#555] italic mb-1 font-display">
                  {closingSalutation}
                </p>
              )}
              <p className="text-[18px] text-[#111] font-medium">
                {signatureName}
              </p>
              <p className="text-[14px] text-[#888]">{signatureTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
