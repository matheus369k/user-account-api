/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
import type { MiddlewareErros } from '@/middlewares/error';
import type { NextFunction, Response, Request } from 'express';

export const errorHandle = (
	error: MiddlewareErros,
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	response.status(error.statusCode || 500).json({
		message: error.message,
		statusCode: error.statusCode || 500,
	});
};
