import {
  NewsletterProvider,
  NewsletterSubscribeInput,
} from "../newsletter-provider";

export class ConsoleProvider implements NewsletterProvider {
  async subscribe(input: NewsletterSubscribeInput): Promise<void> {
    console.log("[Newsletter] Subscription Request:", {
      ...input,
      timestamp: new Date().toISOString(),
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return Promise.resolve();
  }
}
