import express from 'express';
import path from 'path';
import apiRoutes from './routes';
import { GlobalErrorHandler, NotFoundErrorHandler } from './middlewares';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api', apiRoutes);

// 404(Not Found) Error Handler
app.use(NotFoundErrorHandler);

// Global error Handler Middleware
app.use(GlobalErrorHandler);

export default app;
