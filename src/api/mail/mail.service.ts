import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, 
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.APP_URL}/auth/verify?token=${token}`;
    await this.transporter.sendMail({
      from: `"My App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Verify your email',
      html: `
        <h3>Welcome to Cure App!</h3>
        <p>Click below to verify your email:</p>
        <a href="${url}">Verify Email</a>
      `,
    });
  }
}
