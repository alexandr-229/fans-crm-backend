import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterBodyDTO } from './dto/register.dto';
import { AppService } from './app.service';
import { LoginBodyDTO } from './dto/login.dto';

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
}
