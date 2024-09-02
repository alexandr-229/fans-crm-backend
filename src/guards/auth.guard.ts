import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from '../types/request';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext) {
        try {
            const request = context.switchToHttp().getRequest();
            const token = this.getToken(request);
            if (!token) {
                throw new UnauthorizedException();
            }

            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });

            if (!payload || !payload.email || !payload.id) {
                throw new UnauthorizedException();
            }

            request['user'] = payload;
            return true;
        } catch (error) {
            console.log('Failed to check user authorization:', error);
            throw new UnauthorizedException();
        }
    }

    private getToken(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') || [];
        const result = type === 'Bearer' ? token : undefined;
        return result;
    }
}
