import { DataSourceOptions } from 'typeorm';
const ormCfg = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'sunzehui',
  database: 'tests',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  datestrings: true,
} as DataSourceOptions;

export default ormCfg;
