import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Role } from '../../shared/enum/role.enum';
import { UserEntity } from '../../user/entity/user.entity';
import { UserInterface } from '../interface/user-interface';
@Injectable()
export abstract class AbstractJwtGuard extends AuthGuard('accessToken') {
  protected abstract readonly configService: ConfigService;
  protected abstract readonly reflector: Reflector;
  protected abstract getSecretKey(): string;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Extract the token from the query string
    const headers = request?.headers;
    let token = headers?.authorization;
    const bearerPrefix = 'Bearer ';

    // Check if the header contains the Bearer prefix
    if (token && token.startsWith(bearerPrefix)) {
      // Remove the Bearer prefix
      token = token.slice(bearerPrefix.length);
    }
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      //@todo
      // Verify the token using config secret key
      const secretOrPublicKey = this.getSecretKey();
      const decoded: UserInterface = <UserInterface>(
        jwt.verify(token, secretOrPublicKey)
      );
      if (!decoded) throw new UnauthorizedException();
      // Attach the user object to the request for later use
      request.user = decoded;
      return true;
    } catch (error) {
      console.log('failed decoding access token:', error);
      throw new UnauthorizedException();
    }
  }
  handleRequest<TUser = any>(
    err: any,
    user: any,
    // info: any,
    // context: ExecutionContext,
    // status?: any,
  ): TUser {
    // Implement the handleRequest method here.
    return user; // Example: Return the user object for demonstration.
  }
}
