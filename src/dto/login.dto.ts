import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginBodyDTO {
	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(3)
	@MaxLength(32)
	password: string;
};
