import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ContactPageData, ContactFormField } from "@/types";

// Import Upstash and Resend
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Resend } from "resend";

// Initialize Services
const resend = new Resend(process.env.RESEND_API_KEY);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create Rate Limiters (using Upstash)
const ipRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute per IP
  prefix: "ratelimit_ip",
});

const emailRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 m"), // 3 requests per minute per Email
  prefix: "ratelimit_email",
});

// Basic Security Limits
const MAX_STRING_LENGTH = 1000; // Prevents OOM (Memory) crashes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"]; // Prevents malicious scripts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown_ip";

    // 1. Check IP rate limit via Upstash Redis
    const { success: ipSuccess } = await ipRateLimit.limit(ip);
    if (!ipSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests from this IP. Try again later.",
        },
        { status: 429 },
      );
    }

    const formData = await req.formData();

    // 2. Check Email rate limit
    let submittedEmail: string | null = null;
    const emailField = formData.get("email");
    if (typeof emailField === "string" && emailField.trim() !== "") {
      submittedEmail = emailField.toLowerCase().trim();

      const { success: emailSuccess } =
        await emailRateLimit.limit(submittedEmail);
      if (!emailSuccess) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many requests from this email. Try again later.",
          },
          { status: 429 },
        );
      }
    }

    // 3. Read dynamic form config
    const dataPath = path.join(process.cwd(), "data", "pages", "contact.json");
    const fileContent = await fs.readFile(dataPath, "utf-8");
    const contactData = JSON.parse(fileContent) as ContactPageData;
    const fields = contactData.form_config.fields;

    const errors: string[] = [];
    const extractedData: Record<string, string> = {}; // To store data for Resend
    const attachments = []; // To store files for Resend

    // 4. Safe Validation Loop
    for (const field of fields) {
      if (field.type === "file") {
        const file = formData.get(field.name) as File | null;

        if (field.required && (!file || file.size === 0)) {
          errors.push(`Missing required file: ${field.label}`);
        } else if (file && file.size > 0) {
          // FILE TYPE CHECK (Security)
          if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            errors.push(
              `File type not allowed for ${field.label}. Use JPG, PNG, or PDF.`,
            );
          }
          // FILE SIZE CHECK
          const sizeMB = file.size / (1024 * 1024);
          if (field.max_file_size_mb && sizeMB > field.max_file_size_mb) {
            errors.push(
              `File ${field.label} exceeds maximum size of ${field.max_file_size_mb}MB.`,
            );
          }

          // If valid, prepare attachment for Resend
          if (errors.length === 0) {
            const arrayBuffer = await file.arrayBuffer();
            attachments.push({
              filename: file.name,
              content: Buffer.from(arrayBuffer),
            });
          }
        }
      } else {
        const value = formData.get(field.name) as string | null;

        // MISSING FIELD CHECK
        if (field.required && (!value || value.trim() === "")) {
          errors.push(`Missing required field: ${field.label}`);
        } else if (value) {
          // MAX LENGTH CHECK (Security)
          const allowedLength = field.max_length || 2000; // Use JSON limit, fallback to 2000

          if (value.length > allowedLength) {
            errors.push(
              `${field.label} is too long. Maximum ${allowedLength} characters.`,
            );
          }

          // EMAIL FORMAT CHECK
          if (field.type === "email" && !EMAIL_REGEX.test(value)) {
            errors.push(`Please provide a valid email address.`);
          }

          extractedData[field.label] = value;
        }
      }
    }

    // 5. Return all errors if any exist
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors },
        { status: 400 },
      );
    }

    // 6. Build the email content dynamically
    let emailHtml = `<h2>New Contact Form Submission</h2>`;
    for (const [label, value] of Object.entries(extractedData)) {
      emailHtml += `<p><strong>${label}:</strong> ${value}</p>`;
    }

    // 7. Send the Email using Resend
    await resend.emails.send({
      from: "Hotel Website <onboarding@resend.dev>", // Change this to your verified domain later
      to: "ds07bts@gmail.com", // Where you want to receive the inquiries
      subject: `New Inquiry from ${extractedData["Name"] || "Website"}`,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    console.log(`Success: Email sent from IP ${ip}`);
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
