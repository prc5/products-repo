import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.TYPEORM_TYPE as 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
