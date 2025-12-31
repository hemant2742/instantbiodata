import { PDF_CONFIG } from './constants';

export interface ImageProcessingResult {
  success: boolean;
  data?: string;
  error?: string;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

class ImageProcessor {
  private static instance: ImageProcessor;

  static getInstance(): ImageProcessor {
    if (!ImageProcessor.instance) {
      ImageProcessor.instance = new ImageProcessor();
    }
    return ImageProcessor.instance;
  }

  validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size
    if (file.size > PDF_CONFIG.MAX_FILE_SIZE) {
      return { 
        isValid: false, 
        error: `File size must be less than ${PDF_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB` 
      };
    }

    // Check file type
    if (!PDF_CONFIG.SUPPORTED_FORMATS.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Please select a valid image file (JPEG, PNG, or WebP)' 
      };
    }

    return { isValid: true };
  }

  async fileToDataURL(file: File): Promise<ImageProcessingResult> {
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          resolve({ success: true, data: result });
        } else {
          resolve({ success: false, error: 'Failed to read file' });
        }
      };

      reader.onerror = () => {
        resolve({ success: false, error: 'Failed to read file' });
      };

      reader.readAsDataURL(file);
    });
  }

  async cropImage(
    imageSrc: string, 
    cropArea: CropArea, 
    outputWidth: number = 300,
    outputHeight: number = 400,
    quality: number = 0.9
  ): Promise<ImageProcessingResult> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      if (!ctx) {
        resolve({ success: false, error: 'Canvas not supported' });
        return;
      }

      img.onload = () => {
        try {
          // Set canvas dimensions to desired output size
          canvas.width = outputWidth;
          canvas.height = outputHeight;

          // Calculate scale factors
          const scaleX = img.naturalWidth / img.width;
          const scaleY = img.naturalHeight / img.height;

          // Draw cropped image
          ctx.drawImage(
            img,
            cropArea.x * scaleX,
            cropArea.y * scaleY,
            cropArea.width * scaleX,
            cropArea.height * scaleY,
            0,
            0,
            outputWidth,
            outputHeight
          );

          // Convert to data URL
          const croppedDataURL = canvas.toDataURL('image/jpeg', quality);
          resolve({ success: true, data: croppedDataURL });
        } catch (error) {
          resolve({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Cropping failed' 
          });
        }
      };

      img.onerror = () => {
        resolve({ success: false, error: 'Failed to load image' });
      };

      img.src = imageSrc;
    });
  }

  async resizeImage(
    imageSrc: string,
    maxWidth: number = 800,
    maxHeight: number = 1000,
    quality: number = 0.9
  ): Promise<ImageProcessingResult> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      if (!ctx) {
        resolve({ success: false, error: 'Canvas not supported' });
        return;
      }

      img.onload = () => {
        try {
          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw resized image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to data URL
          const resizedDataURL = canvas.toDataURL('image/jpeg', quality);
          resolve({ success: true, data: resizedDataURL });
        } catch (error) {
          resolve({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Resizing failed' 
          });
        }
      };

      img.onerror = () => {
        resolve({ success: false, error: 'Failed to load image' });
      };

      img.src = imageSrc;
    });
  }

  async optimizeForPDF(imageSrc: string): Promise<ImageProcessingResult> {
    // Resize image to optimal dimensions for PDF
    return this.resizeImage(imageSrc, 600, 800, 0.95);
  }
}

// Export singleton instance
export const imageProcessor = ImageProcessor.getInstance();

// Utility functions for easy access
export const validateImageFile = (file: File) => {
  return imageProcessor.validateFile(file);
};

export const processImageFile = async (file: File): Promise<ImageProcessingResult> => {
  return imageProcessor.fileToDataURL(file);
};

export const cropImageData = async (
  imageSrc: string,
  cropArea: CropArea,
  outputWidth?: number,
  outputHeight?: number,
  quality?: number
): Promise<ImageProcessingResult> => {
  return imageProcessor.cropImage(imageSrc, cropArea, outputWidth, outputHeight, quality);
};