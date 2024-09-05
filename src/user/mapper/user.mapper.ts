import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { DeepPartial } from 'typeorm';
import { UserProfileDto } from '../dto/user-profile.dto';

@Injectable()
export class UserMapper {
  mapProfile(user: DeepPartial<User>): UserProfileDto {
    return {
      email: user?.email,
      id: user?.id,
    };
  }
}
