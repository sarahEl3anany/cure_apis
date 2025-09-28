import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { OtpEntity } from './entities/otp.entity';
@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
