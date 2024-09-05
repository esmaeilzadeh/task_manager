export interface SecurityConfig {
  jwtSecretRefresh: string;
  jwtExpiresInRefresh: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  bcryptSaltOrRound: number;
}
