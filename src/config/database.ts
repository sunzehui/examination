import { DataSourceOptions } from 'typeorm';
const ormCfg = {
  type: 'mysql',
  host: 'server.hui.zone',
  port: 3306,
  username: 'exam',
  password: 'exam',
  database: 'exam',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  datestrings: true,
} as DataSourceOptions;

export default ormCfg;
