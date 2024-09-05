export interface OtpPhoneConfig {
  template: string;
  api_token: string;
  service: object;
  dryrun: boolean;
  sender?: string;
  tokenName: string;
}
