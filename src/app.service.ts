import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';
import { IUser } from './types/user';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types/jwt-payload';
import { INVALID_PASSWORD, USER_ALREADY_EXISTS, USER_NOT_FOUND } from './constants/auth';

@Injectable()
export class AppService {
	constructor(
		@InjectModel(User) private userModel: typeof User,

		private readonly jwtService: JwtService,
	) {}

	async register(user: Omit<IUser, 'id'>) {
		const existsUser = await this.userModel.findOne({ where: { email: user.email } });
		if (existsUser) {
			throw new BadRequestException(USER_ALREADY_EXISTS);
		}

		const salt = await genSalt(10);
		const passwordHash = await hash(user.password, salt);

		const newUser = await this.userModel.create({
			email: user.email,
			name: user.name,
			password: passwordHash,
		});
		const payload: JWTPayload = {
			id: newUser.id,
			email: newUser.email,
		};

		const token = this.jwtService.sign(payload);

		return {
			token,
		};
	}

	async login(email: string, password: string) {
		const user = await this.userModel.findOne({ where: { email } });
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		const passwordValid = await compare(password, user.password);
		if (!passwordValid) {
			throw new BadRequestException(INVALID_PASSWORD);
		}

		const payload: JWTPayload = {
			id: user.id,
			email: user.email,
		};
		const token = this.jwtService.sign(payload);

		return {
			token,
		};
	}

	async findUserByEmail(email: string) {
		const user = await this.userModel.findOne({ where: { email }, attributes: { exclude: ['password'] } });
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		return user;
	}
}
