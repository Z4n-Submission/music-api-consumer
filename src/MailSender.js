const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Music Api Apps',
      to: targetEmail,
      subject: 'Ekspor Daftar Lagu Dalam Playlist',
      text: 'Terlampir hasil dari ekspor playlist mucik Anda',
      attachments: [
        {
          filename: 'notes.json',
          content,
        },
      ],
    };

    return this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
