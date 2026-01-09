import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
            return;
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
            id: string;
            email: string;
            role: string;
        };

        // Attach user to request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token',
        });
    }
};

export const adminOnly = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({
            status: 'error',
            message: 'Admin access required',
        });
        return;
    }
    next();
};
