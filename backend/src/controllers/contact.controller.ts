import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// Submit contact form (Public)
export const submitContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            res.status(400).json({
                status: 'error',
                message: 'Name, email, and message are required',
            });
            return;
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject: subject || 'No Subject',
                message,
            },
        });

        res.status(201).json({
            status: 'success',
            message: 'Message sent successfully',
            data: contact,
        });
    } catch (error) {
        console.error('Submit contact error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Get all messages (Admin)
export const getAllMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const messages = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' },
        });

        res.json({
            status: 'success',
            data: messages,
        });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Mark as read (Admin)
export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        await prisma.contact.update({
            where: { id },
            data: { read: true },
        });

        res.json({
            status: 'success',
            message: 'Message marked as read',
        });
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Delete message (Admin)
export const deleteMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        await prisma.contact.delete({
            where: { id },
        });

        res.json({
            status: 'success',
            message: 'Message deleted successfully',
        });
    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
