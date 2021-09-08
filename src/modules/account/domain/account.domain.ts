import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserBuilder } from './account.domain.builder';

@Entity('t_user')
export class Account {
  constructor(builder?: UserBuilder) {
    if (builder) {
      this.id = builder.id;
      this.email = builder.email;
      this.password = builder.password;
      this.name = builder.name;
    }
  }

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  static get Builder() {
    return UserBuilder;
  }

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }
}
