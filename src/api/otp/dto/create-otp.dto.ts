import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { Entity, Column, CreateDateColumn } from 'typeorm';

@Entity('otps')
export class CreateOtpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MaxLength(6)
  @MinLength(6)
  @IsOptional()
  otp: string;

  @CreateDateColumn({ type: 'datetime' })
  @IsOptional()
  createdAt: Date;

  @Column({ type: 'datetime' })
  @IsOptional()
  expiresAt: Date;
}
