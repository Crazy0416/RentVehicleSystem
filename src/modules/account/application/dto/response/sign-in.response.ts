export class SignInResponse {
  constructor(token: string) {
    this.token = token;
  }

  public readonly token: string;
}
