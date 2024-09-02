import { BadRequestException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { IUser } from './types/user';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types/jwt-payload';

@Injectable()
export class AppService {
	constructor(
		@InjectModel(User) private userModel: typeof User,

		private readonly jwtService: JwtService,
	) {}

	async register(user: Omit<IUser, 'id'>) {
		const existsUser = await this.userModel.findOne({ where: { email: user.email } });
		if (existsUser) {
			throw new BadRequestException('User already exists');
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
}
