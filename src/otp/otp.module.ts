import { Module } from '@nestjs/common';
import { OtpService } from './service/otp.service';
import { RedisModule } from '../redis/redis.module';
import { SmsModule } from '../sms/sms.module';
import { SharedModule } from '../shared/shared.module';
@Module({
  imports: [RedisModule, SmsModule, SharedModule],
  providers: [OtpService],
  controllers: [],
  exports: [OtpService],
})
export class OtpModule {}
