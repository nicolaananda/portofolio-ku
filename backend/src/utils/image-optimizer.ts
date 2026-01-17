import sharp from 'sharp';

interface OptimizeOptions {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
}

interface OptimizedResult {
    buffer: Buffer;
    mimetype: string;
    extension: string;
}

/**
 * Optimize image by converting to WebP format and compressing
 * @param buffer - Original image buffer
 * @param options - Optimization options
 * @returns Optimized image buffer with metadata
 */
export const optimizeImage = async (
    buffer: Buffer,
    options?: OptimizeOptions
): Promise<OptimizedResult> => {
    const quality = options?.quality ?? 80;
    const maxWidth = options?.maxWidth ?? 1920;
    const maxHeight = options?.maxHeight ?? 1080;

    const optimizedBuffer = await sharp(buffer)
        .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
        })
        .webp({ quality })
        .toBuffer();

    return {
        buffer: optimizedBuffer,
        mimetype: 'image/webp',
        extension: '.webp',
    };
};
