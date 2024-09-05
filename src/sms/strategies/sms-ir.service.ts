import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { OtpConfig } from '../../shared/interface/otp-config.interface';
import { PlatformConfigInterface } from '../../shared/interface/platform-config.inteface';
import { SendSimpleSmsInterface } from '../interface/send-simple-sms.interface';
import { SendSmsByTemplateInterface } from '../interface/send-sms-by-template.Interface';
import { SmsStrategyInterface } from '../interface/sms.strategy.interface';

@Injectable()
export class SmsIrService implements SmsStrategyInterface {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.config = configService.get<PlatformConfigInterface>('platform');
  }
  private config: PlatformConfigInterface;

  getApiToken(): string {
    return this.configService.get<OtpConfig>('otp').phone.api_token;
  }

  getServiceUrl(): string {
    return this.config.sms_ir.base_url;
  }
  cleanPhoneNumber(phoneNumber: string): string {
    // Remove country code (e.g., +1) or leading zeros
    return phoneNumber.replace(/^(\+\d{1,3}|0*)/, '');
  }
  async sendByTemplate(data: SendSmsByTemplateInterface): Promise<boolean> {
    try {
      const params = {
        mobile: this.cleanPhoneNumber(data.receptor),
        templateId: parseInt(data.template),
        parameters: data.tokens,
      };
      const url = this.getServiceUrl() + this.config.sms_ir.verify_url;
      await firstValueFrom(
        this.httpService.post(url, params, {
          headers: {
            'X-API-KEY': this.getApiToken(),
          },
        }),
      );
      console.log('sms_ir (lookup) sent:', params);
      return true;
    } catch (e) {
      console.error('sms_ir error (lookup): ', e?.message);
      console.error('sms_ir error (lookup) body: ', e?.response?.data);
      return false;
    }
  }

  async send(data: SendSimpleSmsInterface): Promise<boolean> {
    try {
      const sender = this.configService.get('otp.phone.sender');
      const smsParams = {
        receptor: data.receptor,
        message: data.text,
        sender: sender ? sender : undefined,
      };
      await firstValueFrom(
        this.httpService.get(this.getServiceUrl() + '/sms/send.json', {
          params: smsParams,
        }),
      );
      console.log('sms_ir (send) sent: ', smsParams);
    } catch (e) {
      console.error('sms_ir error: (send)', e.message);
      console.error('sms_ir error (send) body: ', e?.response?.data);
      return false;
    }
    return true;
  }
}
