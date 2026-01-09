import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import authRoutes from './routes/auth.routes';
import portfolioRoutes from './routes/portfolio.routes';
import blogRoutes from './routes/blog.routes';
import uploadRoutes from './routes/upload.routes';
import contactRoutes from './routes/contact.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Origin:', req.headers.origin);
    console.log('Referer:', req.headers.referer);
    next();
});

// app.use(helmet({
//     crossOriginResourcePolicy: { policy: 'cross-origin' },
// }));

app.use(cors({
    origin: true, // Allow all origins reflected
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
    });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
});

export default app;
