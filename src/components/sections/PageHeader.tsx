import Image from "next/image";
import Link from "next/link";
import { getCTABySlug } from "@/lib/data/loaders";
import { PageFadeIn } from "@/components/animation/PageFadeIn";
import { ImageFadeIn } from "@/components/animation/ImageFadeIn";
import type { Route } from "next";

export interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  heroImage?: { src: string; alt: string };
  ctaRef?: string;
  variant: "standard" | "split" | "minimal";
}

export async function PageHeader({
  title,
  subtitle,
  heroImage,
  ctaRef,
  variant,
}: PageHeaderProps) {
  const ctaData = ctaRef ? await getCTABySlug(ctaRef) : null;

  if (variant === "split") {
    return (
      <section
        aria-label="Page header"
        className="pt-24 md:pt-32 pb-section overflow-hidden"
      >
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <PageFadeIn className="lg:col-span-6 xl:col-span-5 relative z-10">
              <h1 className="text-page-h1 font-display font-bold text-text-primary">
                {title}
              </h1>
              {subtitle && (
                <p className="text-body-large text-text-secondary mt-6">
                  {subtitle}
                </p>
              )}
              {ctaData && (
                <div className="mt-8">
                  <Link
                    href={(ctaData.button_url || "/") as Route}
                    className="inline-block bg-brand-primary text-text-on-dark px-8 py-3 rounded-btn text-sm font-medium tracking-wide uppercase hover:bg-opacity-80 transition-colors duration-base"
                  >
                    {ctaData.button_text}
                  </Link>
                </div>
              )}
            </PageFadeIn>

            {heroImage && (
              <div className="lg:col-span-6 xl:col-span-7 relative">
                <ImageFadeIn
                  delay={0.2}
                  className="relative aspect-[3/4] md:aspect-[4/5] w-full rounded-sm overflow-hidden max-w-lg lg:max-w-none mx-auto lg:ml-auto lg:mr-0"
                >
                  <Image
                    fill
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="object-cover"
                    priority
                  />
                </ImageFadeIn>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Page header"
      className={variant === "minimal" ? "py-24 md:py-32" : "pt-24 md:pt-32"}
    >
      <div className="container-content">
        <PageFadeIn className="max-w-3xl">
          <h1 className="text-page-h1 font-display font-bold text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="text-body-large text-text-secondary mt-3">
              {subtitle}
            </p>
          )}
          {ctaData && (
            <div className="mt-8">
              <Link
                href={(ctaData.button_url || "/") as Route}
                className="inline-block bg-brand-primary text-text-on-dark px-8 py-3 rounded-btn text-sm font-medium tracking-wide uppercase hover:bg-opacity-80 transition-colors duration-base"
              >
                {ctaData.button_text}
              </Link>
            </div>
          )}
        </PageFadeIn>
      </div>

      {variant === "standard" && heroImage && (
        <ImageFadeIn
          delay={0.3}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] mt-10 md:mt-16"
        >
          <Image
            fill
            src={heroImage.src}
            alt={heroImage.alt}
            className="object-cover"
            priority
          />
        </ImageFadeIn>
      )}
    </section>
  );
}
