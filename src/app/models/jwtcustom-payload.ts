export interface JWTCustomPayload {
userId: number;
  role: number;
  createTo: string;
  iat: number;
  exp: number;
}
