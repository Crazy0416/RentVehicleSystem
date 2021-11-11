/* eslint-disable @typescript-eslint/ban-ts-ignore */
require('dotenv').config();

import * as faker from 'faker';
import { ValidationError } from 'class-validator';
import { License } from './../license.entity';
import { LicenseBuilder } from './../license.domain.builder';
import { LicenseNumber } from '../license-number.vo';

describe('License(운전면허증) 엔티티 유닛 테스트', () => {
  let builder: LicenseBuilder;
  let license: License;

  beforeEach(async () => {
    license = undefined;
    builder = new LicenseBuilder();
    builder.setName(faker.name.lastName());
    builder.setNumber(new LicenseNumber('12-12-123123-12'));
    builder.setSerialNumber(faker.datatype.string(6));
    builder.setUserId(faker.datatype.number(10));
    builder.setBirth(new Date(1994, 3, 16));
    builder.setExpiredDate(new Date(2022, 11, 31));
  });

  describe('생성자 유닛 테스트', () => {
    describe('name 속성 validate', () => {
      it('name은 필수 값이여야 합니다.', () => {
        builder.setName(undefined);

        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('name');
        }
        expect(license).toBe(undefined);
      });

      it('name은 30자를 초과하면 안됩니다.', () => {
        builder.setName(faker.datatype.string(31));

        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('name');
        }
        expect(license).toBe(undefined);
      });

      it('name은 30자 이하여야 합니다.', () => {
        builder.setName(faker.datatype.string(30));

        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBe(undefined);
        }
        expect(license).toBeInstanceOf(License);
      });
    });

    describe('userId 속성 validate', () => {
      it('userId는 필수 값입니다.', () => {
        try {
          builder.setUserId(undefined);
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('userId');
        }
        expect(license).toBe(undefined);
      });

      it('userId는 int 타입입니다.', () => {
        builder.setUserId(0.1);

        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('userId');
        }
        expect(license).toBe(undefined);
      });
    });

    describe('user 속성 validate', () => {
      it('user 속성은 optional 입니다.', () => {
        builder.setUser(undefined);

        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBe(undefined);
        }
        expect(license).toBeInstanceOf(License);
      });
    });

    describe('number 속성 validate', () => {
      it('number 속성은 필수 값입니다.', () => {
        try {
          builder.setNumber(undefined);
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('number');
        }
        expect(license).toBe(undefined);
      });
    });

    describe('birth 속성 validate', () => {
      it('birth 속성은 필수 값입니다.', () => {
        try {
          builder.setBirth(undefined);
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('birth');
        }
        expect(license).toBe(undefined);
      });

      it('birth 속성은 Date 형식입니다.', () => {
        try {
          // @ts-ignore
          builder.setBirth('2021-10-12');
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('birth');
        }
        expect(license).toBe(undefined);
      });

      // TODO: 날짜 test case 보강할 것
      it('birth는 만 18세 이상이여야 합니다.', () => {
        const now = new Date();
        const year17Minus = new Date(
          now.setFullYear(new Date().getFullYear() - 17),
        );
        try {
          builder.setBirth(year17Minus);
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('birth');
        }
        expect(license).toBe(undefined);
      });
    });

    describe('serialNumber 속성 validate', () => {
      it('serialNumber는 필수 값입니다.', () => {
        builder.setSerialNumber(undefined);
        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('serialNumber');
        }
        expect(license).toBe(undefined);
      });

      it('serialNumber는 문자열입니다.', () => {
        // @ts-ignore
        builder.setSerialNumber(123456);
        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('serialNumber');
        }
        expect(license).toBe(undefined);
      });

      it('serialNumber는 6자리여야 합니다. (7자리는 오류)', () => {
        builder.setSerialNumber('1234567');
        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('serialNumber');
        }
        expect(license).toBe(undefined);
      });

      it('serialNumber는 6자리여야 합니다. (5자리는 오류)', () => {
        builder.setSerialNumber('12345');
        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('serialNumber');
        }
        expect(license).toBe(undefined);
      });
    });

    describe('expiredAt 속성 validate', () => {
      it('expiredAt은 필수 값입니다.', () => {
        builder.setExpiredDate(undefined);
        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('expiredAt');
        }
        expect(license).toBe(undefined);
      });

      it('expiredAt은 Date 객체 형식입니다.', () => {
        // @ts-ignore
        builder.setExpiredDate('2020-12-12T00:00:000Z');
        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('expiredAt');
        }
        expect(license).toBe(undefined);
      });

      it('expiredAt은 오늘 날짜보다 작으면 만료된 면허증으로, 오류가 발생합니다.', () => {
        const oneMonthBefore = new Date();
        oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        builder.setExpiredDate(oneMonthBefore);

        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.property).toBe('expiredAt');
        }
        expect(license).toBe(undefined);
      });

      it('expiredAt은 오늘 날짜보다 크면 문제가 발생하지 않습니다.', () => {
        const oneMonthAfter = new Date();
        oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
        builder.setExpiredDate(oneMonthAfter);

        try {
          license = new License(builder);
        } catch (err) {
          expect(err).toBe(undefined);
        }
        expect(license).toBeInstanceOf(License);
      });
    });
  });
});
