import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1628351977920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create User table id sequence
    await queryRunner.query(`CREATE SEQUENCE public.t_user_id_seq 
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;`);
    await queryRunner.query(`CREATE TABLE public.t_user (
      id int4 NOT NULL,
      email varchar NOT NULL,
      "password" varchar NOT NULL,
      "name" varchar NOT NULL,
      CONSTRAINT "pk_t_user_id" PRIMARY KEY (id),
      CONSTRAINT "uk_t_user_email" UNIQUE (email)
    );`);
    await queryRunner.query(
      `ALTER TABLE public.t_user_id_seq OWNER TO postgres;`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE public.t_user_id_seq OWNED BY public.t_user.id;`,
    );
    await queryRunner.query(
      `ALTER TABLE ONLY public.t_user ALTER COLUMN id SET DEFAULT nextval('public.t_user_id_seq'::regclass);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('t_user');
  }
}
