import { Exclude } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';
import { BasicUuidEntity } from '../../shared/entity/basic-uuid.entity';

@Entity()
export class User extends BasicUuidEntity {
  @Index('unique_user_email', ['email'], {
    unique: true,
    where: '"deletedAt" is null',
  })
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  blockedAt: Date | null;
}
