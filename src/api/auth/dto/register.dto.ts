import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password_confirmation: string;

  @ApiProperty({ example: 'user father' })
  @IsString()
  name: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
