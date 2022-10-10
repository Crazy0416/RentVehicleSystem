export class SignUpResponse {
  constructor(token: string) {
    this.token = token;
  }

  public readonly token: string;
}
