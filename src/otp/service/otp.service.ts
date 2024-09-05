import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../redis/redis.service';
import { PasswordHelper } from '../../shared/helper/password.helper';
import { OtpConfig } from '../../shared/interface/otp-config.interface';
import { SmsService } from '../../sms/service/sms.service';
import { OtpGenerateInterface } from '../interface/otp-generate.interface';
import { OtpVerifyInterface } from '../interface/otp-verify.interface';

@Injectable()
export class OtpService {
  private otpConfig: Exclude<OtpConfig, undefined>;

  async sendPhoneOtpCode(input: OtpGenerateInterface): Promise<number> {
    const stored = <number>(
      await this.redisService.get(input.role + '-' + input.cellphone)
    );
    console.log('stored', stored);
    const code = stored || this.generateRandomNumber(this.otpConfig.length);
    await this.redisService.setWithExpiration(
      input.role + '-' + input.cellphone,
      code,
      this.otpConfig.expiration,
    );
    console.log('otp code', code);
    console.log('otp config', this.otpConfig);
    if (!this.otpConfig.phone.dryrun && !stored) {
      console.log('not dry run');
      //refactor add logger
      if (
        !(await this.smsService.sendByTemplate({
          template: this.otpConfig.phone.template,
          receptor: input.cellphone,
          tokens: [{ name: this.otpConfig.phone.tokenName, value: code }],
        }))
      )
        console.log('error in sending otp message by sms.');
    }
    return code;
  }

  constructor(
    private readonly redisService: RedisService,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
    private readonly passwordHelper: PasswordHelper,
  ) {
    this.otpConfig = this.configService.getOrThrow<OtpConfig>('otp');
  }

  // generate random number with custom length
  generateRandomNumber(digit: number): number {
    return this.passwordHelper.getRandomNumber(digit);
  }

  async verifyPhoneOtpCode(input: OtpVerifyInterface): Promise<boolean> {
    const code = await this.redisService.get(
      input.role + '-' + input.cellphone,
    );
    return code && code == input.otp;
  }
}
