import { NextRequest, NextResponse } from "next/server";
import { getNewsletterData } from "@/lib/data/loaders";
import { getNewsletterProvider } from "@/lib/data/email/newsletter-provider";

// Import Upstash Redis
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Initialize Upstash Redis (Reusing the keys from your .env)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create Rate Limiter (3 requests per hour per IP)
const newsletterRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  prefix: "ratelimit_newsletter",
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const newsletterData = await getNewsletterData();
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { email, consent } = body;

    // 1. Validate Email (Length AND Format)
    const maxLength = newsletterData.max_email_length || 254; // 254 is the global web standard limit

    if (
      !email ||
      typeof email !== "string" ||
      email.length > maxLength ||
      !EMAIL_REGEX.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: newsletterData.error_message || "Invalid email address",
        },
        { status: 400 },
      );
    }

    // 2. Validate Consent
    if (consent !== true) {
      return NextResponse.json(
        { success: false, message: "Consent is required." },
        { status: 400 },
      );
    }

    // 3. Upstash Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown_ip";
    const { success: rateLimitSuccess } = await newsletterRateLimit.limit(ip);

    if (!rateLimitSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    // 4. Provider Call
    const provider = getNewsletterProvider();
    try {
      await provider.subscribe({
        email,
        consentGiven: consent,
        source: "website-footer",
        tags: ["newsletter-form"],
      });

      return NextResponse.json(
        {
          success: true,
          message:
            newsletterData.success_message || "Thank you for subscribing.",
        },
        { status: 200 },
      );
    } catch (error: any) {
      console.error("[Newsletter API] Provider Error:", error);
      // Gracefully handle if they are already subscribed
      if (error.message === "already_subscribed") {
        return NextResponse.json(
          { success: true, message: "You are already subscribed!" },
          { status: 200 },
        );
      }
      return NextResponse.json(
        { success: false, message: "An error occurred. Please try again." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("[Newsletter API] Unexpected Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
}

// ... GET, PUT, DELETE, PATCH stay the same
export async function GET() {
  return new NextResponse(null, { status: 405 });
}

export async function PUT() {
  return new NextResponse(null, { status: 405 });
}

export async function DELETE() {
  return new NextResponse(null, { status: 405 });
}

export async function PATCH() {
  return new NextResponse(null, { status: 405 });
}
