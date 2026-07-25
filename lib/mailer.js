import { Resend } from 'resend';

/**
 * Send a contact-form email via Resend.
 * The client is created lazily inside the function so the module can be
 * imported at build time without requiring RESEND_API_KEY to be set.
 *
 * @param {string} name     - Visitor's name
 * @param {string} email    - Visitor's email (used as reply-to, NOT as from)
 * @param {string} subject  - Subject chosen by the visitor
 * @param {string} message  - Body of the message
 * @throws Will throw if Resend returns an error, so the API route can respond correctly.
 */
const sendMail = async (name, email, subject, message) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    // Must be a verified sender on your Resend domain
    from: 'Contact ONG Volotsangana <contact@ong-volotsangana.org>',
    to: ['ong.volotsangana16@gmail.com'],
    // reply_to lets you hit "Reply" in Gmail and it goes straight back to the visitor
    reply_to: `${name} <${email}>`,
    subject: `[Site web] ${subject}`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Message du site ONG Volotsangana</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background-color: #2d6a4f; color: #ffffff; padding: 24px 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; }
    .body { padding: 28px 32px; color: #333333; line-height: 1.6; }
    .body p { margin: 0 0 16px; }
    .label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { margin-top: 4px; font-size: 15px; }
    .message-box { background: #f9f9f9; border-left: 4px solid #2d6a4f; padding: 16px; border-radius: 4px; white-space: pre-wrap; }
    .footer { background-color: #2d6a4f; color: #cce8d8; padding: 16px 32px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouveau message depuis le site web</h1>
    </div>
    <div class="body">
      <p class="label">Expéditeur</p>
      <p class="value">${name} &lt;${email}&gt;</p>

      <p class="label">Sujet</p>
      <p class="value">${subject}</p>

      <p class="label">Message</p>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      ONG Volotsangana — ong-volotsangana.org
    </div>
  </div>
</body>
</html>`,
    text: `Nouveau message depuis le site web\n\nExpéditeur: ${name} <${email}>\nSujet: ${subject}\n\n${message}`,
  });

  if (error) {
    throw new Error(error.message ?? 'Resend: échec de l\'envoi');
  }
};

export default sendMail;
