"use client";

import React from "react";
import { Languages, MapPin, Car, Cpu, Coffee, Clock } from "lucide-react";
import { ProximityPoint } from "@/types/business";
import Link from "next/link";

export interface InfoBlockProps {
  iconRef: string;
  heading: string;
  contentType: "paragraph" | "list" | "distance-table" | "hours";
  content: string | string[] | ProximityPoint[] | any;
  note?: string;
  href?: string;
}

const IconMap: Record<string, React.ElementType> = {
  languages: Languages,
  location: MapPin,
  parking: Car,
  technologies: Cpu,
  amenities: Coffee,
  hours: Clock,
};

export function InfoBlock({
  iconRef,
  heading,
  contentType,
  content,
  note,
  href,
}: InfoBlockProps) {
  const IconComponent = IconMap[iconRef] || MapPin;

  const HeadingEl = href ? (
    <Link href={href as any} className="hover:underline transition-colors">
      {heading}
    </Link>
  ) : (
    <>{heading}</>
  );

  return (
    <div className="bg-white rounded-[12px] p-8 md:p-10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-[#111]">
          <IconComponent className="size-[18px]" strokeWidth={1.5} />
        </div>
        <h3 className="text-[20px] font-display font-semibold text-[#111]">
          {HeadingEl}
        </h3>
      </div>

      <div className="text-[16px] text-[#111]/80 leading-[1.8] flex-1 font-sans">
        {contentType === "paragraph" && typeof content === "string" && (
          <div className="space-y-4">
            {content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {contentType === "list" && Array.isArray(content) && (
          <ul className="list-disc list-inside space-y-2">
            {(content as string[]).map((item, idx) => (
              <li key={idx} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
        )}

        {contentType === "distance-table" && Array.isArray(content) && (
          <div>
            <p className="mb-4">
              Address: 123 Demo Street, 9999 Demoville, Demoland
            </p>
            <p className="mb-2">Centrally located near major cities:</p>
            <ul className="list-disc list-inside space-y-2">
              {(content as ProximityPoint[]).map((point, idx) => (
                <li key={idx} className="pl-1">
                  {point.distance_text} from {point.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {contentType === "hours" && content && (
          <dl className="space-y-2 w-full max-w-sm">
            {Object.entries(content).map(([days, hours], idx) => (
              <div
                key={idx}
                className="flex justify-between border-b border-border-subtle pb-1"
              >
                <dt className="capitalize">{days}</dt>
                <dd className="font-medium">{hours as string}</dd>
              </div>
            ))}
          </dl>
        )}

        {note && <p className="mt-6">{note}</p>}
      </div>
    </div>
  );
}
