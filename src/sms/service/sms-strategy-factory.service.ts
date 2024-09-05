import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsIrService } from '../strategies/sms-ir.service';
import { OtpConfig } from '../../shared/interface/otp-config.interface';
import { SmsStrategyInterface } from '../interface/sms.strategy.interface';

@Injectable()
export class SmsStrategyFactory {
  private instance: SmsStrategyInterface;

  constructor(
    private readonly configService: ConfigService,
    // private readonly kavenegarService: KavenegarService,
    private readonly smsIrService: SmsIrService,
  ) {}

  factory(): SmsStrategyInterface {
    const otpConfig = this.configService.get<OtpConfig>('otp');
    const implementationType = otpConfig.phone.service;
    // const apiKey = otpConfig.phone.api_token;
    switch (implementationType) {
      // case KavenegarService:
      //   this.instance = this.kavenegarService;
      //   break;
      case SmsIrService:
        this.instance = this.smsIrService;
        break;
      default:
        throw new Error(`Invalid implementation type: ${implementationType}`);
    }
    return this.instance;
  }
}
