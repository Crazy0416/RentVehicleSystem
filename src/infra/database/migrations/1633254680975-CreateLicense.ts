import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLicense1633254680975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.t_license (
      user_id int4 NOT NULL,
      "number" varchar NOT NULL,
      "name" varchar NOT NULL,
      "birth" date NOT NULL,
      "serial_number" varchar NOT NULL,
      "expired_datetime" date NOT NULL,
      "iv" varchar NOT NULL,
      CONSTRAINT "pk_t_license_user_id" PRIMARY KEY (user_id),
      CONSTRAINT "uk_t_license_number" UNIQUE ("number"),
      CONSTRAINT "fk_t_license_t_user"
        FOREIGN KEY(user_id)
          REFERENCES t_user(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('t_license');
  }
}
