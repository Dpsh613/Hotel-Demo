import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getContactPageData,
  getBusinessContact,
  getBusinessIdentity,
  getSocialPlatforms,
} from "@/lib/data/loaders";
import { ContactForm } from "@/components/interactive/ContactForm";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { SocialIconLink } from "@/components/common/SocialIconLink";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title || data.page_title,
    description: data.meta_description || "",
    path: `/contact`,
  });
}

export default async function ContactPage() {
  const [data, contact, identity, socialsData] = await Promise.all([
    getContactPageData(),
    getBusinessContact(),
    getBusinessIdentity(),
    getSocialPlatforms(),
  ]);

  if (!data || !data.form_config) notFound();

  const socials = socialsData?.platforms.filter((s) => s.show_in_contact) || [];

  return (
    <div className="py-24 md:py-32 container-content">
      <SectionReveal>
        <div className="bg-surface-default p-8 md:p-12 lg:p-16 rounded-2xl shadow-subtle grid grid-cols-1 lg:grid-cols-2 bg-white">
          {/* Left column: Contact info */}
          <div className="space-y-12 pb-12 lg:pb-0 lg:pr-12 xl:pr-16 border-b lg:border-b-0 lg:border-r border-border-subtle">
            <div className="flex items-center justify-between">
              <h1 className="text-[20px] md:text-[40px] font-display font-semibold text-text-primary leading-tight">
                {data.page_title}
              </h1>
              {data.show_social_links && socials.length > 0 && (
                <div className="flex gap-2">
                  {socials.map((social) => (
                    <SocialIconLink
                      key={social.platform}
                      platform={social.platform}
                      url={social.url}
                      variant="color"
                      size="md"
                      className="!m-0 h-8 w-8 min-h-0 min-w-0 rounded bg-surface-alternate flex items-center justify-center hover:bg-border-subtle transition-colors bg-[#EDEBE4]"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {data.show_address_block && contact && identity && (
                <div>
                  <address className="not-italic text-body-base text-text-secondary space-y-1">
                    <p className="text-text-primary mb-2">
                      {identity.business_name}
                    </p>
                    <p>
                      {contact.address_line_1}, {contact.postcode}{" "}
                      {contact.city}
                    </p>
                    {identity.vat_number && <p>VAT: {identity.vat_number}</p>}
                  </address>
                </div>
              )}

              {contact && (contact.phone || contact.email) && (
                <div className="text-body-base text-text-primary space-y-2">
                  {contact.email && (
                    <p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="underline underline-offset-4 hover:text-brand-secondary transition-colors"
                      >
                        {contact.email}
                      </a>
                    </p>
                  )}
                  {contact.phone && (
                    <p>
                      <a
                        href={contact.phone_uri || `tel:${contact.phone}`}
                        className="underline underline-offset-4 hover:text-brand-secondary transition-colors"
                      >
                        T: {contact.phone}
                      </a>
                    </p>
                  )}
                </div>
              )}

              {data.show_maps_link && contact.maps_link && (
                <div className="mt-8">
                  <div className="relative w-full h-[320px] rounded-lg overflow-hidden bg-[#EDEBE4] mb-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.9059516677943!2d4.301389!3d51.016389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDAwJzU5LjAiTiA0wrAxOCcwNS4wIkU!5e0!3m2!1sen!2sbe!4v1620000000000!5m2!1sen!2sbe"
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        filter: "grayscale(1) contrast(0.9) opacity(0.7)",
                        mixBlendMode: "multiply",
                      }}
                      allowFullScreen={false}
                      loading="lazy"
                    ></iframe>

                    {/* Custom Map Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md">
                      <div className="bg-black border-[3px] border-white rounded-xl p-3 flex items-center justify-center relative z-10 w-[60px] h-[60px]">
                        <img
                          src="/images/brand/logo-icon.svg"
                          alt="Pin"
                          className="w-full h-full invert object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 z-0 rounded-sm"></div>
                    </div>
                  </div>
                  <a
                    href={contact.maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold text-text-primary tracking-widest uppercase hover:text-text-secondary transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="border-b-[1.5px] border-text-primary pb-0.5">
                      VIEW ON GOOGLE MAPS
                    </span>
                    <span className="text-lg leading-none font-normal -translate-y-[1px]">
                      ↗
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right column: Form */}
          <div className="pt-12 lg:pt-2 lg:pl-12 xl:pl-16">
            <h2 className="text-[12px] md:text-[24px] font-display font-semibold text-text-primary mb-8">
              Ready to explore more? Let's connect.
            </h2>
            <ContactForm
              formConfig={data.form_config as any}
              privacyPolicyUrl="/privacy-policy"
            />
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
