import { UserEntity } from 'src/user/entity/user.entity';
export class LoginOutputDto {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
  };
}
