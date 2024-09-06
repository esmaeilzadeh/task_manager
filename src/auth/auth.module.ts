import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { AuthUserService } from './service/auth-user.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule, SharedModule],
  providers: [JwtStrategy, UserRepository, AuthUserService],
  controllers: [AuthController],
})
export class AuthModule {}
