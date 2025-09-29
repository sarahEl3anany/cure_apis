import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpEntity } from './entities/otp.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepo: Repository<OtpEntity>,
  ) {}

  async generateOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

    const otpReq = this.otpRepo.create({ email, otp, expiresAt });
    await this.otpRepo.save(otpReq);

    await this.sendEmail(email, otp);

    return { 
      success: true,
      message: 'OTP sent successfully to your email, ',
      data: {
        email,
        expires_at: expiresAt.toISOString(),
        note: `OTP is ${otp} :returned here only for testing purposes and will be removed in production.`
      }
    };
  }

  private async sendEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cure App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });
  }

  async verifyOtp(email: string, otp: string) {
    const otpCode = await this.otpRepo.findOne({ where: { email, otp } });
    if (!otpCode) {
      return { valid: false, message: 'Invalid OTP' };
    }
    if (otpCode.expiresAt < new Date()) {
      return { valid: false, message: 'OTP expired' };
    }
    return { valid: true, message: 'OTP verified' };
  }

}
