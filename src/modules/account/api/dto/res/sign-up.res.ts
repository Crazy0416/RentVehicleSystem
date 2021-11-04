export class SignUpRes {
  constructor(token: string) {
    this.token = token;
  }

  public readonly token: string;
}
