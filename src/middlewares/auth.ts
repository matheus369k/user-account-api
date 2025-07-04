import type { Request, Response, NextFunction } from "express";
import { UnAuthorizationError } from "./error";
import jwt from "jsonwebtoken";
import { env } from "@/util/env";
import { prisma } from "@/lib/prisma";

type UserTokenPayloadType = {
	id: string;
};

export class MiddlewareAuth {
	async user(request: Request, _: Response, next: NextFunction) {
		const { authorization } = request.headers;
		if (!authorization) {
			throw new UnAuthorizationError("user not have permission..");
		}
		const token = authorization.split(" ")[1];
		const verifyToken = jwt.verify(
			token,
			env.JWT_SECRET_KEY,
		) as UserTokenPayloadType;
		if (!verifyToken) {
			throw new UnAuthorizationError("not authorization");
		}

		const user = await prisma.user.findUnique({
			where: {
				id: verifyToken.id,
			},
			select: {
				create_at: true,
				email: true,
				name: true,
				id: true,
			},
		});

		if (!user) {
			throw new UnAuthorizationError("not authorization");
		}

		request.user = user;
		next();
	}
}
