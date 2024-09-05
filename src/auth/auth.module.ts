import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { AuthUserService } from './service/auth-user.service';
import { OtpModule } from '../otp/otp.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    SharedModule
  ],
  providers: [JwtStrategy, UserRepository, AuthUserService],
  controllers: [AuthController],
})
export class AuthModule {}
