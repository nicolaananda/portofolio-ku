import { Response } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// Initialize S3 Client for Cloudflare R2
const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});

const uploadToR2 = async (file: Express.Multer.File): Promise<{ url: string; key: string }> => {
    const fileContent = file.buffer;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + (file.originalname.includes('.') ? file.originalname.substring(file.originalname.lastIndexOf('.')) : '');
    const key = `uploads/${filename}`; // Unique key

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: file.mimetype,
    });

    await s3Client.send(command);

    // Return public URL and generated filename (key)
    return {
        url: `${process.env.R2_PUBLIC_URL}/${key}`,
        key: filename
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

        const { originalname, mimetype, size } = req.file;

        // Upload to R2
        const { url, key: filename } = await uploadToR2(req.file);

        // Save to database
        const media = await prisma.media.create({
            data: {
                filename,
                originalName: originalname,
                mimetype,
                size,
                url, // Store the R2 URL
                path: url, // Path is also URL in this case
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
                const { originalname, mimetype, size } = file;

                // Upload to R2
                const { url, key: filename } = await uploadToR2(file);

                const media = await prisma.media.create({
                    data: {
                        filename,
                        originalName: originalname,
                        mimetype,
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
