import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterBodyDTO } from './dto/register.dto';
import { AppService } from './app.service';
import { LoginBodyDTO } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { JWTPayload } from './types/jwt-payload';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() user: RegisterBodyDTO) {
		const result = await this.appService.register(user);
		return result;
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() { email, password }: LoginBodyDTO) {
		const result = await this.appService.login(email, password);
		return result;
	}

	@UseGuards(AuthGuard)
	@Get('me')
	async getMe(@User() { email }: JWTPayload) {
		const user = await this.appService.findUserByEmail(email);
		return user;
	}
}
