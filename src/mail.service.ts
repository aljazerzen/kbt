import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

export class MailService {

  static async send(text: string) {
    config();

    let transporter = nodemailer.createTransport(<SMTPTransport.Options>{
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'KBT Alert',
      text,
      html: `<p>${text}</p>`
    });

    await transporter.close();
  }
}
