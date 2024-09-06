import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProfileDto } from '../dto/user-profile.dto';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from '../mapper/user.mapper';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userMapper: UserMapper,
  ) {}

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }
  async getProfile(id: string): Promise<UserProfileDto> {
    return this.userMapper.mapProfile(
      await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ['agencyProfile'],
      }),
    );
  }

  async validateUserWithToken(userId: string): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('user with provided email not found');
    }

    return user;
  }

  async createUser(data) {
    const user = await this.userRepository.save(data);

    return user;
  }
}
