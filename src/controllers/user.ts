import type { Request, Response } from 'express';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '@/util/env';
import { BadRequestError, ServerError } from '@/middlewares/error';

export type UserType = {
	name: string;
	email: string;
	password: string;
	auto_connection: 'on' | 'off';
};

export class UserControllers {
	async registerUser(request: Request, response: Response) {
		const { name, email, password, auto_connection }: UserType = request.body;
		const user = await prisma.user.findMany({
			where: {
				email,
			},
		});

		if (user.length > 0) {
			throw new BadRequestError('this user already register...');
		}

		const cryptPass = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: cryptPass,
			},
			select: {
				create_at: true,
				email: true,
				name: true,
				id: true,
			},
		});

		if (!newUser) {
			throw new ServerError('error to create new user...');
		}

		const token = jwt.sign(
			{
				id: newUser.id,
			},
			env.JWT_SECRET_KEY,
			{
				expiresIn: auto_connection === 'on' ? '8d' : '10s',
			},
		);

		response.json({
			user: newUser,
			token,
		});
	}

	async loginUser(request: Request, response: Response) {
		const { email, password, auto_connection }: Omit<UserType, 'name'> =
			request.body;
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (!user) {
			throw new BadRequestError('password or email invalid...');
		}

		const verifyPass = await bcrypt.compare(password, user.password);
		if (!verifyPass) {
			throw new BadRequestError('password or email invalid...');
		}

		const { password: _, ...userLogin } = user;

		const token = jwt.sign(
			{
				id: user.id,
			},
			env.JWT_SECRET_KEY,
			{
				expiresIn: auto_connection === 'on' ? '8d' : '10s',
			},
		);
		response.json({
			user: userLogin,
			token,
		});
	}

	async profilerUser(request: Request, response: Response) {
		response.json({
			user: request.user,
		});
	}
}
