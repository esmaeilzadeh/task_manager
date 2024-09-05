import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendSimpleSmsInterface } from '../interface/send-simple-sms.interface';
import { SendSmsByTemplateInterface } from '../interface/send-sms-by-template.Interface';
import { SmsStrategyFactory } from './sms-strategy-factory.service';

@Injectable()
export class SmsService {
  constructor(
    private readonly strategyFactory: SmsStrategyFactory,
    private readonly configService: ConfigService,
  ) {}

  async sendByTemplate(data: SendSmsByTemplateInterface): Promise<boolean> {
    if (this.configService.get<boolean>('otp.dryrun')) {
      console.log('otp.dryrun=true');
      return true;
    }
    return this.strategyFactory.factory().sendByTemplate(data);
  }

  async send(data: SendSimpleSmsInterface): Promise<boolean> {
    console.log('send simple sms', data);
    return this.strategyFactory.factory().send(data);
  }
}
