import {
  NewsletterProvider,
  NewsletterSubscribeInput,
} from "../newsletter-provider";

export class MailchimpProvider implements NewsletterProvider {
  async subscribe(input: NewsletterSubscribeInput): Promise<void> {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !serverPrefix || !audienceId) {
      console.error("Missing Mailchimp environment variables");
      throw new Error("Mailchimp configuration error");
    }

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    // Mailchimp requires Basic Auth (any username + API key base64 encoded)
    const token = Buffer.from(`anystring:${apiKey}`).toString("base64");

    const data = {
      email_address: input.email.toLowerCase(),
      status: "subscribed", // Or "pending" if you want double opt-in (confirmation email)
      tags: input.tags,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // If Mailchimp returns 400 because they are already subscribed, we handle it gracefully
    if (response.status === 400 && result.title === "Member Exists") {
      throw new Error("already_subscribed");
    }

    if (!response.ok) {
      console.error("Mailchimp Error:", result);
      throw new Error("Failed to subscribe to Mailchimp");
    }
  }
}
