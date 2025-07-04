export type ExpressRequestUserType = {
	id: string;
	name: string;
	email: string;
	password: string;
	create_at: DateTime;
};

declare global {
	namespace Express {
		export interface Request {
			user: Partial<ExpressRequestUserType>;
		}
	}
}
