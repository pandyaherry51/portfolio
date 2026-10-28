const nodemailer = require('nodemailer');

let transporter = null;

const initMailer = async () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    console.log(`✅ [Nodemailer] Configured SMTP via ${host}`);
  } else {
    // Development fallback
    transporter = null;
    console.log('ℹ️ [Nodemailer] Live SMTP credentials not set. Contact form messages will be logged to console and saved to database.');
  }
};

const sendContactNotification = async ({ name, email, subject, message }) => {
  const receiver = process.env.NOTIFICATION_RECEIVER_EMAIL || 'pandyaherry51@gmail.com';

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER || 'no-reply@portfolio.dev'}>`,
    to: receiver,
    replyTo: email,
    subject: `[Portfolio Notification] ${subject || 'New Contact Message'} from ${name}`,
    text: `You received a new message from your portfolio contact form:
    
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent at: ${new Date().toISOString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #3b82f6; padding: 20px; color: white;">
          <h2 style="margin: 0;">New Message from Portfolio</h2>
        </div>
        <div style="padding: 24px;">
          <p><strong>Sender:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <h3 style="margin-top: 0;">Message Content:</h3>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #3b82f6;">${message}</p>
        </div>
        <div style="background: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #64748b;">
          Sent from Pandya Herry Sanjaykumar's Portfolio Contact Form
        </div>
      </div>
    `,
  };

  if (transporter) {
    return await transporter.sendMail(mailOptions);
  } else {
    console.log('\n📬 --- NEW PORTFOLIO CONTACT MESSAGE ---');
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('---------------------------------------\n');
    return { mock: true, messageId: `mock-${Date.now()}` };
  }
};

module.exports = {
  initMailer,
  sendContactNotification,
};

