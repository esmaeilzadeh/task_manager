import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { DeepPartial } from 'typeorm';
import { UserProfileDto } from '../dto/user-profile.dto';

@Injectable()
export class UserMapper {
  mapProfile(user: DeepPartial<UserEntity>): UserProfileDto {
    return {
      email: user?.email,
      id: user?.id,
    };
  }
}
