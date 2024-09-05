import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from '../type/token.type';

@Injectable()
export class JwtHelper {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async generateToken<A extends object>(
    payload: A,
    secret: string,
    expiresIn = '1d',
  ): Promise<TokenType> {
    const jwtid = uuidv4();
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret: secret,
    });
    return { token: accessToken, jwtid };
  }
}
