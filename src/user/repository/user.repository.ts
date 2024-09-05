import { Injectable } from '@nestjs/common';
import { Role } from 'src/shared/enum/role.enum';
import { DataSource, In, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  public async findById(id: string): Promise<Partial<User>> {
    return await this.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Partial<User>> {
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
