import { OtpPhoneConfig } from './otp-phone-config.interface';

export interface OtpConfig {
  length: number;
  expiration: number;
  phone: OtpPhoneConfig;
}
