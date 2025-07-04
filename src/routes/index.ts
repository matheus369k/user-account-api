import { UserControllers } from '@/controllers/user';
import { MiddlewareAuth } from '@/middlewares/auth';
import express from 'express';

const routes = express();

routes.post('/api/user/register', new UserControllers().registerUser);
routes.post('/api/user/login', new UserControllers().loginUser);
routes.get(
	'/api/user',
	new MiddlewareAuth().user,
	new UserControllers().profilerUser,
);

export default routes;
