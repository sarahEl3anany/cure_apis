import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly userRepo: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
  
  async login(userIn: LoginDto) {
    const user = await this.validateUser(userIn.email, userIn.password);
    const token = user.token;
    const tokenType = user.token_type;
    return {
      message: 'Login successful',
      token,
      token_type: tokenType,
      user: user
    };
  }

  async register(userIn: RegisterDto) {
    const hashedPassword = await bcrypt.hash(userIn.password, 10);
    const payload = { email: userIn.email };
    const token = await this.jwtService.signAsync(payload);
    const user = await this.userRepo.create({
      ...userIn,
      password: hashedPassword,
      token,
      token_type: 'Bearer',
    });
    const savedUser = await this.userRepo.save(user);
    return {
      data :{
        token:token,
        token_type:'Bearer',
        user:{
          ...savedUser,
          birthDate: savedUser.birthDate ?? '',
          avatar: savedUser.avatar ?? '',
          email_verified_at: savedUser.email_verified_at ?? '',
        }
      },
      message: 'Registration successful',
      success: true
    };
  }
}
