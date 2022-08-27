import { DataSourceOptions } from 'typeorm';
const mysqlCfg = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'exam',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  datestrings: true,
} as DataSourceOptions;
const redisCfg = {
  host: 'redis',
  port: 6379,
};
export { mysqlCfg, redisCfg };
