import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SharedModule } from '../shared/shared.module';
import { AuthUserService } from './service/auth-user.service';
@Module({
  imports: [UserModule, SharedModule],
  providers: [JwtStrategy, AuthUserService],
  controllers: [AuthController],
})
export class AuthModule {}
