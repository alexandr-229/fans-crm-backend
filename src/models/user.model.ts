import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
	@Column({
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		allowNull: false,
	})
	name: string;

	@Column({
		allowNull: false,
		unique: true,
	})
	email: string;
}
