import cors from 'cors';
import express from 'express';
import { errorHandler } from './handlers/error-handler';
import authRoute from './routes/v1/admin/auth-route';
import adminRoute from './routes/v1/admin/user-route';

import statusRoute from './routes/v1/status-route';
import itemRoute from './routes/v1/user/item-route';
import userRoute from './routes/v1/user/user-route';
import path from 'path';

const app = express();
app.use(express.json());

app.use(
	cors({
		origin: ['http://localhost:8000'],
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}),
);

app.use('/services/uploads/images', express.static(path.resolve(__dirname, '../services/uploads/images')));

app.use('/api', statusRoute);

app.use('/v1/admin/auth', authRoute);
app.use('/v1/admin', adminRoute);

app.use('/v1/user', userRoute);
app.use('/v1/user/items', itemRoute);

app.use(errorHandler);

export default app;
