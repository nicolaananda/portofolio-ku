import { Response } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { optimizeImage } from '../utils/image-optimizer';

// Initialize S3 Client for Cloudflare R2
const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});

const uploadToR2 = async (file: Express.Multer.File): Promise<{ url: string; key: string; size: number }> => {
    // Optimize image: convert to WebP and compress
    const optimized = await optimizeImage(file.buffer, {
        quality: 80,
        maxWidth: 1920,
        maxHeight: 1080,
    });

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + optimized.extension;
    const key = `uploads/${filename}`;

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: optimized.buffer,
        ContentType: optimized.mimetype,
    });

    await s3Client.send(command);

    // Return public URL, generated filename, and optimized size
    return {
        url: `${process.env.R2_PUBLIC_URL}/${key}`,
        key: filename,
        size: optimized.buffer.length,
    };
};

// Upload single image
export const uploadImage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({
                status: 'error',
                message: 'No file uploaded',
            });
            return;
        }

        const { originalname } = req.file;

        // Upload to R2 (converts to WebP and compresses)
        const { url, key: filename, size } = await uploadToR2(req.file);

        // Save to database
        const media = await prisma.media.create({
            data: {
                filename,
                originalName: originalname,
                mimetype: 'image/webp',
                size,
                url,
                path: url,
            },
        });

        res.json({
            status: 'success',
            message: 'File uploaded successfully',
            data: {
                id: media.id,
                url: media.url,
                filename: media.filename,
            },
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// Upload multiple images
export const uploadImages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            res.status(400).json({
                status: 'error',
                message: 'No files uploaded',
            });
            return;
        }

        const uploadedFiles = await Promise.all(
            req.files.map(async (file) => {
                const { originalname } = file;

                // Upload to R2 (converts to WebP and compresses)
                const { url, key: filename, size } = await uploadToR2(file);

                const media = await prisma.media.create({
                    data: {
                        filename,
                        originalName: originalname,
                        mimetype: 'image/webp',
                        size,
                        url,
                        path: url,
                    },
                });

                return {
                    id: media.id,
                    url: media.url,
                    filename: media.filename,
                };
            })
        );

        res.json({
            status: 'success',
            message: 'Files uploaded successfully',
            data: uploadedFiles,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
