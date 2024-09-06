import { Injectable } from '@nestjs/common';
import { Role } from 'src/shared/enum/role.enum';
import { DataSource, In, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  public async findById(id: string): Promise<Partial<UserEntity>> {
    return await this.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Partial<UserEntity>> {
    return await this.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        blockedAt: true,
      },
    });
  }
}
