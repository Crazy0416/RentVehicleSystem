export class SignUpServiceDto {
  public email: string;

  public password: string;

  public name: string;

  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
