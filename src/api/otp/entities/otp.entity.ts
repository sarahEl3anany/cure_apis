import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('otps')
export class OtpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string; 

  @Column()
  otp: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  expiresAt: Date;
}
