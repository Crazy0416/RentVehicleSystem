import * as faker from 'faker';
import { Account } from './../account.entity';
import { UserBuilder } from './../account.domain.builder';
import { ValidationError } from 'class-validator';

describe('Account(계정) 엔티티 유닛 테스트', () => {
  let account: Account;
  let builder: UserBuilder;

  beforeEach(() => {
    account = undefined;
    builder = new UserBuilder();
    builder.setName(faker.name.lastName());
    builder.setEmail(faker.internet.email().toLowerCase());
    builder.setPassword(faker.datatype.string(10));
  });

  describe('생성자 테스트', () => {
    describe('id 속성 테스트', () => {
      it('id 값은 optional이다. (디비에서 값을 가져오기 때문)', () => {
        builder.setId(undefined);
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBe(undefined);
        }
        expect(account).toBeInstanceOf(Account);
      });

      it('id 값은 numeric이다.', () => {
        // @ts-ignore
        builder.setId('1');
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect((err as ValidationError).property).toBe('id');
        }
        expect(account).toBe(undefined);

        builder.setId(1);
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBe(undefined);
        }
        expect(account).toBeInstanceOf(Account);
      });
    });

    describe('email 속성 테스트', () => {
      it('계정의 email은 필수 값이다.', () => {
        builder.setEmail(undefined);
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('email');
        }
        expect(account).toBe(undefined);
      });

      it('계정의 email은 email 형태여야 한다. (포맷)', () => {
        builder.setEmail('not eamil');
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('email');
        }
        expect(account).toBe(undefined);
      });

      it('계정의 email은 email 형태여야 한다. (빈칸)', () => {
        builder.setEmail(' test@naver.com');
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('email');
        }
        expect(account).toBe(undefined);

        builder.setEmail('test@naver.com ');
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('email');
        }
        expect(account).toBe(undefined);
      });

      /**
       * 전자 메일 주소의 도메인 이름 부분은 대소 문자를 구분하지 않습니다.
       * 따라서 소문자로 전환해야 합니다.
       */
      it('계정의 email은 소문자 형태여야 한다. (lowerCase)', () => {
        builder.setEmail('Test@naver.com');
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('email');
        }
        expect(account).toBe(undefined);
      });
    });

    describe('hashedPassword 속성 테스트', () => {
      it('hashedPassword 속성은 필수 값이다.', () => {
        builder.setPassword(undefined);
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('hashedPassword');
        }
        expect(account).toBe(undefined);
      });

      it('hashedPassword는 내부에서 해싱되어 평문 암호값과 달라져야 한다.', () => {
        const randomPassword = faker.datatype.string(10);
        builder.setPassword(randomPassword);

        account = new Account(builder);
        expect(account.password.hashedPassword).not.toEqual(randomPassword);
      });
    });

    describe('name 속성 테스트', () => {
      it('name 속성은 필수 값이다.', () => {
        builder.setName(undefined);
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('name');
        }
        expect(account).toBe(undefined);
      });

      it('name 속성은 문자열이다.', () => {
        // @ts-ignore
        builder.setName(123);
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('name');
        }
        expect(account).toBe(undefined);
      });

      it('name 속성은 30자 이하여야 한다.', () => {
        // 30자는 허용
        builder.setName(faker.datatype.string(30));
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBe(undefined);
        }
        expect(account).toBeInstanceOf(Account);
      });

      it('name 속성은 30자를 초과하면 안된다.', () => {
        // 31자는 비허용
        builder.setName(faker.datatype.string(31));
        try {
          account = new Account(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('name');
        }
        expect(account).toBe(undefined);
      });
    });
  });

  describe('comparePassword 메서드 테스트', () => {
    it('hashPassword의 원문과 인자 값으로 전달된 값이 같은 경우 true 반환', async () => {
      const plainPassword = 'abcd1234';
      builder.setPassword(plainPassword);
      account = new Account(builder);

      expect(await account.comparePassword(plainPassword)).toBe(true);
    });

    it('hashPassword의 원문과 인자 값으로 전달된 값이 다른 경우 false 반환', async () => {
      const plainPassword = 'abcd1234';
      const wrongPassword = 'wrongPassword';
      builder.setPassword(plainPassword);
      account = new Account(builder);

      expect(await account.comparePassword(wrongPassword)).toBe(false);
    });
  });
});
