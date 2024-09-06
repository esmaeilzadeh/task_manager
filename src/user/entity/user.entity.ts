import { Exclude } from 'class-transformer';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BasicUuidEntity } from '../../shared/entity/basic-uuid.entity';
import { TaskEntity } from '../../task/entity/task.entity';

@Entity({ name: 'user' })
export class UserEntity extends BasicUuidEntity {
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

  @OneToMany(() => TaskEntity, (t) => t.user)
  tasks: TaskEntity[];
}
