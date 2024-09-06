import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoHelper } from './helper/crypto.helper';
import { StringUtil } from './util/string.util';
import { PasswordHelper } from './helper/password.helper';
import { JwtHelper } from './helper/jwt.helper';
import { PaginationHelper } from './helper/pagination.helper';
@Global()
@Module({
  imports: [],
  providers: [
    CryptoHelper,
    JwtService,
    StringUtil,
    PasswordHelper,
    JwtHelper,
    PaginationHelper,
  ],
  controllers: [],
  exports: [CryptoHelper, StringUtil, PasswordHelper, JwtHelper],
})
export class SharedModule {}
