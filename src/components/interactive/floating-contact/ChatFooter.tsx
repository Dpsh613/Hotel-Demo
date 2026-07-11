import { Phone } from "lucide-react";
import { BusinessContact, SocialPlatform } from "@/types";
import {
  WhatsappIcon,
  InstagramIcon,
  FacebookIcon,
} from "../../common/SocialIconLink";

interface ChatFooterProps {
  contact: BusinessContact;
  social: { platforms: SocialPlatform[] };
}

export function ChatFooter({ contact, social }: ChatFooterProps) {
  const getSocialUrl = (name: string) =>
    social?.platforms?.find((p) => p.platform.toLowerCase() === name)?.url;

  const whatsappUrl = getSocialUrl("whatsapp");
  const instagramUrl = getSocialUrl("instagram");
  const messengerUrl = getSocialUrl("facebook") || getSocialUrl("messenger");

  return (
    <div className="bg-[#FFFFFF] p-5 pt-4 border-t border-[#E0DDD8] shrink-0">
      <p className="text-[11px] font-semibold text-[#999999] uppercase tracking-[0.1em] mb-3">
        Connect with Our Team
      </p>
      <div className="flex gap-3">
        {contact?.phone && (
          <>
            {/* MOBILE VIEW: Clickable "Call Us" link that opens phone app */}
            <a
              href={`tel:${contact.phone.replace(/\D/g, "")}`}
              className="flex-1 flex sm:hidden items-center justify-center gap-2 p-2.5 bg-[#1A1A18] text-[#FFFFFF] rounded-[6px] active:bg-[#111111] transition-colors"
            >
              <Phone size={14} className="shrink-0" />
              <span className="text-[13px] font-medium tracking-wide">
                Call Us
              </span>
            </a>

            {/* LAPTOP/DESKTOP VIEW: Non-clickable text showing the number. Added 'select-text' so users can copy it */}
            <div className="flex-1 hidden sm:flex items-center justify-center gap-2 p-2.5 bg-[#1A1A18] text-[#FFFFFF] rounded-[6px] select-text">
              <Phone size={14} className="shrink-0" />
              <span className="text-[12px] font-medium tracking-wide whitespace-nowrap">
                Call: {contact.phone}
              </span>
            </div>
          </>
        )}

        {/* Social Icons Container (Added shrink-0 to prevent layout crushing) */}
        <div className="flex gap-2 shrink-0">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#F0EDE8] text-[#111111] rounded-[6px] hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <WhatsappIcon className="w-[18px] h-[18px]" />
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#F0EDE8] text-[#111111] rounded-[6px] hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white transition-colors"
            >
              <InstagramIcon className="w-[18px] h-[18px]" />
            </a>
          )}
          {messengerUrl && (
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#F0EDE8] text-[#111111] rounded-[6px] hover:bg-[#0084FF] hover:text-white transition-colors"
            >
              <FacebookIcon className="w-[18px] h-[18px]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
