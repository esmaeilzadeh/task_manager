import { SendSimpleSmsInterface } from './send-simple-sms.interface';
import { SendSmsByTemplateInterface } from './send-sms-by-template.Interface';

export interface SmsStrategyInterface {
  getApiToken(): string;

  getServiceUrl(): string;

  sendByTemplate(data: SendSmsByTemplateInterface): Promise<boolean>;

  send(data: SendSimpleSmsInterface): Promise<boolean>;
}
