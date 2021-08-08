import { User } from './../../user/domain/user.entity';

export class Account {
  constructor(private readonly user: User) {}

  public getId() {
    return this.user.getId();
  }

  public getUser(): User {
    return this.user;
  }

  public getEmail() {
    return this.user.getEmail();
  }
}
