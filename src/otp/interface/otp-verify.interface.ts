import { Role } from '../../shared/enum/role.enum';
export interface OtpVerifyInterface {
  cellphone: string;
  otp: string;
  role: Role;
}
