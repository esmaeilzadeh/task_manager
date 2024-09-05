export class AuthUrl {
  public static readonly APP_REDIRECT_BASE_URL = String(
    process.env.APP_REDIRECT_BASE_URL,
  );
  public static readonly API_CALLBACK_BASE_URL = String(
    process.env.API_CALLBACK_BASE_URL,
  );
  public static readonly forgetPasswordUrl =
    this.API_CALLBACK_BASE_URL + String(process.env.API_FORGET_PASSWORD_URL);
  public static readonly APP_LOGIN_URL =
    this.APP_REDIRECT_BASE_URL + String(process.env.APP_LOGIN_URL);
}
