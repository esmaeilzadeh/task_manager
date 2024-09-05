import { Module } from '@nestjs/common';
import { SmsService } from './service/sms.service';
// import { KavenegarService } from './strategies/kavenegar.service';
import { HttpModule } from '@nestjs/axios';
import { SmsStrategyFactory } from './service/sms-strategy-factory.service';
import { SmsIrService } from './strategies/sms-ir.service';

@Module({
  providers: [SmsService, SmsStrategyFactory, SmsIrService],
  exports: [SmsService, SmsStrategyFactory],
  imports: [HttpModule],
})
export class SmsModule {}
