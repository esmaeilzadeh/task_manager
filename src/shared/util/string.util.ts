import { Injectable } from '@nestjs/common';

@Injectable()
export class StringUtil {
  public extractNameFromEmail(email: string): string {
    return email.split('@')[0];
  }
}
