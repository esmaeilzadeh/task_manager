import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from '../type/token.type';

import { SecurityConfig } from '../interface/security-config.interface';

@Injectable()
export class CryptoHelper {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public generateRandomPassword(length: number): string {
    const passwordBuffer = crypto.randomBytes(length);
    const base64EncodedPassword = passwordBuffer
      .toString('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-');

    return base64EncodedPassword;
  }
  getRandom(length = 10, charset = 'abcdefghijklmnopqrstuvwxyz0123456789') {
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  getRandomInt(digit = 10) {
    return crypto.randomInt(Math.pow(10, digit));
  }
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async generateToken<A extends object>(payload: A): Promise<TokenType> {
    const jwtid = uuidv4();
    //@todo get config from parameter
    const secretWithExpireIn = {
      secret: this.configService.get<SecurityConfig>('security').jwtSecret,
      expiresIn:
        this.configService.get<SecurityConfig>('security').jwtExpiresIn,
    };
    console.log('payload', payload);
    const accessToken = await this.jwtService.signAsync(
      JSON.parse(JSON.stringify(payload)),
      secretWithExpireIn,
    );
    return { token: accessToken, jwtid };
  }
}
