import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/send-reset-otp')
  sendResetOtp(@Body() emailIn: CreateOtpDto) {
    const email = emailIn.email;
    return this.otpService.generateOtp(email);
  }

  @Post('/verify-otp')
  verifyOtp(@Body() otpIn: CreateOtpDto) {
    const email = otpIn.email;
    const otp = otpIn.otp;
    return this.otpService.verifyOtp(email, otp);
  }

}
