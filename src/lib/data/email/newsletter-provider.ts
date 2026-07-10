export interface NewsletterSubscribeInput {
  email: string;
  consentGiven: boolean;
  source: string;
  tags: string[];
}

export interface NewsletterProvider {
  subscribe(input: NewsletterSubscribeInput): Promise<void>;
}

import { ConsoleProvider } from "./providers/console";

export function getNewsletterProvider(): NewsletterProvider {
  const provider = process.env.NEWSLETTER_PROVIDER;

  switch (provider) {
    case "mailchimp":
      // return new MailchimpProvider();
      return new ConsoleProvider(); // Stub for now
    case "loops":
      // return new LoopsProvider();
      return new ConsoleProvider(); // Stub for now
    default:
      return new ConsoleProvider();
  }
}
