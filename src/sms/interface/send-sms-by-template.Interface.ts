import { SmsTokenInterface } from './sms-token';

export interface SendSmsByTemplateInterface {
  //receiver phone number
  receptor: string;
  //variable part of the sms
  tokens: SmsTokenInterface[];
  //static part of the sms
  template: string;
}
