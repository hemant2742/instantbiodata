import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BiodataData, PDFOptions } from '../types';
import { PDF_CONFIG } from './constants';

export interface PDFGenerationResult {
  success: boolean;
  error?: string;
  filename?: string;
}

class PDFGenerator {
  private static instance: PDFGenerator;
  private isGenerating = false;

  static getInstance(): PDFGenerator {
    if (!PDFGenerator.instance) {
      PDFGenerator.instance = new PDFGenerator();
    }
    return PDFGenerator.instance;
  }

  private async waitForImages(element: HTMLElement): Promise<void> {
    const images = element.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      
      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Image load timeout'));
        }, PDF_CONFIG.TIMEOUT);

        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        
        img.onerror = () => {
          clearTimeout(timeout);
          resolve(); // Continue even if image fails to load
        };
      });
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('Some images failed to load:', error);
    }
  }

  private async optimizeForPDF(element: HTMLElement): Promise<void> {
    // Add PDF-specific class for styling
    element.classList.add('pdf-mode');
    
    // Force layout recalculation
    element.offsetHeight;
    
    // Wait for any CSS transitions to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Ensure all images are loaded
    await this.waitForImages(element);
  }

  private cleanupAfterPDF(element: HTMLElement): void {
    element.classList.remove('pdf-mode');
  }

  private generateFilename(data: BiodataData, options?: PDFOptions): string {
    if (options?.filename) return options.filename;
    
    const name = data.name?.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') || 'Biodata';
    const timestamp = new Date().toISOString().split('T')[0];
    return `${name}_Biodata_${timestamp}.pdf`;
  }

  private async captureElement(element: HTMLElement, options: PDFOptions): Promise<HTMLCanvasElement> {
    const canvas = await html2canvas(element, {
      scale: Math.min(options.scale, 6), // Limit scale to prevent memory issues
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      letterRendering: true,
      imageTimeout: PDF_CONFIG.TIMEOUT,
      logging: false,
      removeContainer: true,
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        // Ignore watermark and other non-essential elements
        return element.classList.contains('watermark') || 
               element.classList.contains('live-preview-only');
      },
      onclone: (clonedDoc) => {
        // Enhance cloned document for better PDF rendering
        const clonedElement = clonedDoc.getElementById('biodata-content');
        if (clonedElement) {
          clonedElement.classList.add('pdf-mode');
          
          // Enhance text contrast and colors for PDF
          const style = clonedDoc.createElement('style');
          style.textContent = `
            .pdf-mode {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .pdf-mode * {
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
            }
            .pdf-mode .info-label {
              color: #000000 !important;
              font-weight: 600 !important;
            }
            .pdf-mode .info-value {
              color: #1a1a1a !important;
              font-weight: 500 !important;
            }
            .pdf-mode .traditional-section-title {
              color: #ffffff !important;
              font-weight: 700 !important;
            }
            .pdf-mode .traditional-name {
              color: #8b4513 !important;
              font-weight: 700 !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      }
    });

    return canvas;
  }

  private createPDF(canvas: HTMLCanvasElement, options: PDFOptions): jsPDF {
    const pdf = new jsPDF({
      orientation: options.orientation,
      unit: 'mm',
      format: options.format,
      compress: true,
      precision: 16
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit the page while maintaining aspect ratio
    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;
    
    let imgWidth = pdfWidth - 10; // 5mm margin on each side
    let imgHeight = pdfHeight - 10; // 5mm margin on top and bottom
    
    if (canvasAspectRatio > pdfAspectRatio) {
      // Canvas is wider than PDF page
      imgHeight = imgWidth / canvasAspectRatio;
    } else {
      // Canvas is taller than PDF page
      imgWidth = imgHeight * canvasAspectRatio;
    }

    // Center the image on the page
    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = (pdfHeight - imgHeight) / 2;

    // Use PNG for better quality with transparency support
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    pdf.addImage(
      imgData,
      'PNG',
      xOffset,
      yOffset,
      imgWidth,
      imgHeight,
      undefined,
      'SLOW' // Use SLOW for better quality
    );

    return pdf;
  }

  async generatePDF(
    data: BiodataData, 
    elementId: string = 'biodata-content',
    options: Partial<PDFOptions> = {}
  ): Promise<PDFGenerationResult> {
    if (this.isGenerating) {
      return { success: false, error: 'PDF generation already in progress' };
    }

    this.isGenerating = true;

    const defaultOptions: PDFOptions = {
      scale: PDF_CONFIG.DEFAULT_SCALE,
      format: 'a4',
      orientation: 'portrait',
      quality: PDF_CONFIG.DEFAULT_QUALITY,
      ...options
    };

    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with ID '${elementId}' not found`);
      }

      // Optimize element for PDF generation
      await this.optimizeForPDF(element);

      // Capture the element as canvas
      const canvas = await this.captureElement(element, defaultOptions);

      // Create PDF from canvas
      const pdf = this.createPDF(canvas, defaultOptions);

      // Generate filename and save
      const filename = this.generateFilename(data, defaultOptions);
      pdf.save(filename);

      // Cleanup
      this.cleanupAfterPDF(element);

      return { success: true, filename };

    } catch (error) {
      console.error('PDF generation failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    } finally {
      this.isGenerating = false;
    }
  }

  isGeneratingPDF(): boolean {
    return this.isGenerating;
  }
}

// Export singleton instance
export const pdfGenerator = PDFGenerator.getInstance();

// Utility function for easy access
export const generateBiodataPDF = async (
  data: BiodataData,
  options?: Partial<PDFOptions>
): Promise<PDFGenerationResult> => {
  return pdfGenerator.generatePDF(data, 'biodata-content', options);
};