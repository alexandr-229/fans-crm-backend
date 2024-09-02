import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = (configService: ConfigService): Promise<JwtModuleOptions> | JwtModuleOptions => ({
	secret: configService.get('JWT_SECRET'),
});
