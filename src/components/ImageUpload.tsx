import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Server-side upload function
  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('File must be an image'));
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('File size must be less than 5MB'));
        return;
      }

      // Create FormData for server upload
      const formData = new FormData();
      formData.append('image', file);

      // Upload to server
      fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(response => {
        if (!response.ok) {
          if (response.status === 503) {
            throw new Error('Server is temporarily unavailable. Please try again later.');
          } else if (response.status === 401) {
            throw new Error('Authentication required. Please login again.');
          } else if (response.status === 413) {
            throw new Error('File too large. Please choose a smaller image.');
          } else {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
          }
        }
        return response.json();
      })
      .then(data => {
        if (data.success && data.url) {
          resolve(data.url);
        } else {
          reject(new Error(data.message || 'Upload failed'));
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  const handleFiles = async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error uploading images';
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${dragActive 
            ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-950/20' 
            : 'border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          {isUploading ? (
            <Loader2 className="h-12 w-12 text-cyan-400 mx-auto animate-spin" />
          ) : (
            <Upload className="h-12 w-12 text-gray-400 dark:text-slate-400 mx-auto" />
          )}
          
          <div>
            <p className="text-lg font-medium dark:text-white text-gray-900">
              {isUploading ? 'Uploading...' : 'Drop images here or click to upload'}
            </p>
            <p className="text-sm dark:text-slate-400 text-gray-600 mt-1">
              PNG, JPG, WEBP up to 5MB each
            </p>
            <p className="text-xs dark:text-slate-500 text-gray-500 mt-1">
              {images.length}/{maxImages} images uploaded
            </p>
          </div>
          
          {!isUploading && (
            <Button 
              type="button" 
              variant="outline" 
              className="liquid-glass-button dark:text-white text-gray-900"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose Images
            </Button>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden liquid-glass"
            >
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual URL Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium dark:text-white text-gray-900">
          Or add image URLs manually:
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded-lg liquid-glass dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 px-4 py-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const input = e.currentTarget;
                if (input.value.trim() && images.length < maxImages) {
                  onImagesChange([...images, input.value.trim()]);
                  input.value = '';
                }
              }
            }}
          />
          <Button
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              if (input.value.trim() && images.length < maxImages) {
                onImagesChange([...images, input.value.trim()]);
                input.value = '';
              }
            }}
            className="liquid-glass-button dark:text-white text-gray-900"
          >
            Add URL
          </Button>
        </div>
      </div>

      {/* Upload Status */}
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading images to server...
        </div>
      )}
    </div>
  );
}
