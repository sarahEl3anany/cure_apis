import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AuthEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column({ type: 'varchar', length: 255, unique: true })
email: string;

@Column({ type: 'varchar', length: 255, unique: true })
phone: string;

@Column({ type: 'date', nullable: true, default: null })
birthDate: Date | null;

@Column({ type: 'varchar', length: 255, nullable: true, default: null  })
avatar: string | null;

@Column({ type: 'varchar', length: 255 })
password: string;

@Column({ type: 'date', nullable: true, default: null })
email_verified_at: Date | null;

@CreateDateColumn({ type: 'timestamp' })
created_at: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_at: Date;


@Column({ type: 'varchar', length: 255 })
token: string;

@Column({ type: 'varchar', length: 255 })
token_type: string;
}
