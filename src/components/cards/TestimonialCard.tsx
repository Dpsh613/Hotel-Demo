"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveImagePath } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "size-4",
            i < rating
              ? "fill-current text-brand-secondary"
              : "text-border-strong",
          )}
        />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle?: string;
  authorImageRef?: string | null;
  authorImageAlt?: string;
  rating?: number;
  sourcePlatform?: string;
  featured?: boolean;
}

export function TestimonialCard({
  quote,
  authorName,
  authorTitle,
  authorImageRef,
  authorImageAlt,
  rating,
  sourcePlatform,
  featured = false,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "p-6 bg-surface-default border rounded-[var(--radius-base)] flex flex-col gap-4",
        featured
          ? "border-brand-primary/30 shadow-base"
          : "border-border-subtle",
      )}
    >
      {/* Star rating */}
      {rating !== undefined && rating > 0 && <StarRating rating={rating} />}

      {/* Quote */}
      <blockquote className="flex-1">
        <p className="text-base italic text-text-primary leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      {/* Footer: author + platform */}
      <footer className="flex items-center gap-3 mt-auto pt-2 border-t border-border-subtle">
        {/* Author image */}
        {authorImageRef && (
          <div className="relative size-10 shrink-0">
            <Image
              src={resolveImagePath(authorImageRef)}
              alt={authorImageAlt || authorName}
              fill
              className="rounded-full object-cover"
              sizes="40px"
            />
          </div>
        )}

        {/* Author name + title */}
        <div className="min-w-0">
          <cite className="text-sm font-semibold text-text-primary not-italic block">
            {authorName}
          </cite>
          {authorTitle && (
            <p className="text-xs text-text-secondary truncate">
              {authorTitle}
            </p>
          )}
        </div>

        {/* Source platform badge */}
        {sourcePlatform && (
          <span className="ml-auto text-xs text-[#C46D52] shrink-0">
            {sourcePlatform}
          </span>
        )}
      </footer>
    </article>
  );
}
