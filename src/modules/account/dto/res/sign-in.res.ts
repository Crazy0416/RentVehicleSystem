export class SignInRes {
  constructor(token: string) {
    this.token = token;
  }

  public readonly token: string;
}
