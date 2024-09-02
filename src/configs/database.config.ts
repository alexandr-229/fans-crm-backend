import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getDatabaseConfig = (configService: ConfigService): Promise<SequelizeModuleOptions> | SequelizeModuleOptions => ({
	dialect: 'postgres',
	host: configService.get<string>('DB_HOST'),
	port: parseInt(configService.get<string>('DB_PORT'), 10),
	username: configService.get<string>('DB_USERNAME'),
	password: configService.get<string>('DB_PASSWORD'),
	autoLoadModels: true,
});
