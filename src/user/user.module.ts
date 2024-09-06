import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { UserMapper } from './mapper/user.mapper';
import { UserController } from './controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository, UserMapper],
  controllers: [UserController],

  exports: [UserService, UserRepository],
})
export class UserModule {}
