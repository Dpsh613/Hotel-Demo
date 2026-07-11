const EmailLayout = (content: string, hotelName: string = "Our Hotel") => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9f9; color: #333; line-height: 1.6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background: #262626; color: #ffffff; padding: 30px 40px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
        .content { padding: 40px; }
        .footer { background: #f1f1f1; padding: 20px 40px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${hotelName}</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${hotelName}. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

export const getContactAutoReplyTemplate = (
  userName: string,
  hotelName: string = "Our Hotel",
) => {
  const content = `
    <h2 style="font-size: 20px; font-weight: 600; margin-top: 0;">Thank you for getting in touch, ${userName}.</h2>
    <p>We have successfully received your inquiry.</p>
    <p>Our team is currently reviewing your message and will get back to you as soon as possible (usually within 24-48 hours).</p>
    <p>If your request is urgent, please don't hesitate to call our front desk directly.</p>
    <br/>
    <p>Warm regards,</p>
    <p><strong>The ${hotelName} Team</strong></p>
  `;
  return EmailLayout(content, hotelName);
};

export const getNewsletterWelcomeTemplate = (
  hotelName: string = "Our Hotel",
) => {
  const content = `
    <h2 style="font-size: 20px; font-weight: 600; margin-top: 0;">Welcome to our community!</h2>
    <p>Thank you for subscribing to the ${hotelName} newsletter.</p>
    <p>You are now on the list to receive our latest updates, exclusive offers, and behind-the-scenes looks at our property.</p>
    <p>We promise to keep your inbox inspired and only send you the best.</p>
    <br/>
    <p>Warm regards,</p>
    <p><strong>The ${hotelName} Team</strong></p>
  `;
  return EmailLayout(content, hotelName);
};
