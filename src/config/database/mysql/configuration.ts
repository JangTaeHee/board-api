import { registerAs } from '@nestjs/config';

export default registerAs('mysql_database', () => ({
  type: process.env.APP_DATABASE_TYPE,
  host:
    process.env.APP_ENV === 'development'
      ? process.env.APP_MYSQL_DATABASE_DEV_HOST
      : process.env.APP_MYSQL_DATABASE_PROD_HOST,
  port:
    process.env.APP_ENV === 'development'
      ? process.env.APP_MYSQL_DATABASE_DEV_PORT
      : process.env.APP_MYSQL_DATABASE_PROD_PORT,
  db:
    process.env.APP_ENV === 'development'
      ? process.env.APP_MYSQL_DATABASE_DEV_DB
      : process.env.APP_MYSQL_DATABASE_PROD_DB,
  username:
    process.env.APP_ENV === 'development'
      ? process.env.APP_MYSQL_DATABASE_DEV_USER
      : process.env.APP_MYSQL_DATABASE_PROD_USER,
  password:
    process.env.APP_ENV === 'development'
      ? process.env.APP_MYSQL_DATABASE_DEV_PW
      : process.env.APP_MYSQL_DATABASE_PROD_PW,
}));
