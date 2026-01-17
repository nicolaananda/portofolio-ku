import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface ImageUploadProps {
  images: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  disabled?: boolean;
}

interface UploadProgress {
  fileName: string;
  progress: number;
}

export default function ImageUpload({
  images,
  onChange,
  maxImages = 10,
  disabled = false,
}: ImageUploadProps) {
  const { accessToken } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError('');

    // Check image limit
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    // Initialize progress for all files
    const initialProgress = Array.from(files).map((file) => ({
      fileName: file.name,
      progress: 0,
    }));
    setUploadProgress(initialProgress);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError('Please select valid image files');
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError('File size must be less than 5MB');
          continue;
        }

        // Upload file with progress tracking
        const url = await uploadImageWithProgress(file, i);
        if (url) {
          uploadedUrls.push(url);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...images, ...uploadedUrls]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images');
    } finally {
      setUploading(false);
      setUploadProgress([]);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const uploadImageWithProgress = (file: File, index: number): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress((prev) => {
            const updated = [...prev];
            if (updated[index]) {
              updated[index] = { ...updated[index], progress: percentComplete };
            }
            return updated;
          });
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            // Handle different response formats
            if (data.success && data.url) {
              resolve(data.url);
            } else {
              resolve(data.url || data.imageUrl || data.data?.url || data.data?.imageUrl);
            }
          } catch {
            reject(new Error('Invalid response from server'));
          }
        } else {
          try {
            const data = JSON.parse(xhr.responseText);
            reject(new Error(data.message || data.error || 'Failed to upload image'));
          } catch {
            reject(new Error('Failed to upload image'));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', `${import.meta.env.VITE_API_URL}/upload/image`);
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      xhr.withCredentials = true;
      xhr.send(formData);
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleButtonClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  // Calculate overall progress
  const overallProgress = uploadProgress.length > 0
    ? Math.round(uploadProgress.reduce((sum, p) => sum + p.progress, 0) / uploadProgress.length)
    : 0;

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          disabled={disabled || uploading}
        />
        <Button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled || uploading || images.length >= maxImages}
          variant="outline"
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading... {overallProgress}%
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Images
              {images.length > 0 && ` (${images.length}/${maxImages})`}
            </>
          )}
        </Button>
      </div>

      {/* Progress Bar */}
      {uploading && uploadProgress.length > 0 && (
        <div className="space-y-2">
          {uploadProgress.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="truncate max-w-[200px]">{item.fileName}</span>
                <span>{item.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="group relative aspect-video overflow-hidden rounded-lg border bg-slate-100 dark:bg-slate-800"
            >
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                disabled={disabled}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 disabled:opacity-0"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder when no images */}
      {images.length === 0 && !uploading && (
        <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 text-sm text-slate-500">No images uploaded</p>
          </div>
        </div>
      )}

      {/* Max Images Warning */}
      {images.length >= maxImages && (
        <p className="text-sm text-slate-500">
          Maximum {maxImages} images reached
        </p>
      )}
    </div>
  );
}

