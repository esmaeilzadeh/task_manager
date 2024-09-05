export interface requestWithUser extends Request {
  user: { id: string; referenceCurrencyId?: number };
}
