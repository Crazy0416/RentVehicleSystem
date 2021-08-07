# 렌트카 대여 API 서버

## 목표

렌트카 대여 시스템의 API 서버를 객체 지향적으로 구현하는 것을 목표로 한다. [토이 프로젝트]

## 기획서

[렌트카 대여 시스템 기획서](https://labhong.notion.site/9c59c585cf364420bf96be01baee57f4)

## 커밋 컨벤션

유다시티 컨벤션에 맞추도록 한다. [원본 링크](https://udacity.github.io/git-styleguide/)

## 데이터베이스

Postgresql RDBMS를 사용한다. [Postgres 설치 링크](https://www.postgresql.org/download/)

초기 설치 시 Database 생성 필요

```bash
$ createdb rent_vehicle_db;
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
