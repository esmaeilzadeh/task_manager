import { Exclude } from 'class-transformer';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BasicUuidEntity } from '../../shared/entity/basic-uuid.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'task' })
export class TaskEntity extends BasicUuidEntity {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ default: false })
  completed: boolean;
  @Column()
  userId: string;
  @ManyToOne(() => UserEntity, (u) => u.tasks)
  user: UserEntity;
}
