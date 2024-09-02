import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterBodyDTO {
	@IsString()
	name: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(3)
	@MaxLength(32)
	password: string;
};
