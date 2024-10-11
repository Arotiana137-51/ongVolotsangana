const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,//eto no olana tsy mpoka any ivelany
  },
});

const sendMail = async ( name, email, subject, message) => {
    const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,//'ong.volotsangana16@gmail.com',//
        subject: `Mail du site web: ${subject}`,
        text: `Nom: ${name}`,
        html: `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8" description="mail from ngo website">
        <title>Email provenant du site </title>
        <style>
          .container {
          width: 100%;
          height: 100%;
          padding: 20px;
          background-color: #f4f4f4;
          }
          .email {
          width: 80%;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          }
          .email-header {
          background-color: #333;
          color: #fff;
          padding: 20px;
          text-align: center;
          }
          .email-body {
          padding: 20px;
          }
          .email-footer {
          background-color: #333;
          color: #fff;
          padding: 20px;
          text-align: center;
          }
        </style>
        </head>
        <body>
        <div class="container">
          <div class="email">
          <div class="email-header">
            <h1>Email du site web de l'Ong</h1>
          </div>
          <div class="email-body">
            <p>${message}</p>
          </div>
          <div class="email-footer">
            <p>Expediteur:       ${name}<br>Email de l'expediteur :       ${email}</p>
          </div>
          </div>
        </div>
        </body>
        </html>`,
        secure:true
      };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendMail;
