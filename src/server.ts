import express from 'express';
import cors from 'cors';
import { env } from './util/env';
import routes from './routes';
import { errorHandle } from './util/error-handler';

const app = express();

app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: env.FRONT_END_URL || '*',
		optionsSuccessStatus: 200,
	}),
);
app.use(routes);
app.use(errorHandle);

app.listen(env.PORT, () => {
	console.log(`Server running in http://localhost:${env.PORT}`);
});
