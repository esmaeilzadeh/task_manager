import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from '../interface/security-config.interface';
import { CryptoHelper } from './crypto.helper';

@Injectable()
export class PasswordHelper {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const saltOrRounds = securityConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  constructor(
    private configService: ConfigService,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.cryptoHelper.comparePassword(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return this.cryptoHelper.hashPassword(password);
  }
  presets = {
    password: {
      charset:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+',
      length: 10,
    },
    referral: {
      charset: 'abcdefghijklmnopqrstuvwxyz0123456789',
      length: 9,
    },
  };
  getRandomPassword() {
    return this.cryptoHelper.getRandom(
      this.presets.password.length,
      this.presets.password.charset,
    );
  }
  public getRandomReferral() {
    return this.cryptoHelper.getRandom(
      this.presets.referral.length,
      this.presets.referral.charset,
    );
  }
  getRandomNumber(length: number) {
    return this.cryptoHelper.getRandomInt(length);
  }
}
