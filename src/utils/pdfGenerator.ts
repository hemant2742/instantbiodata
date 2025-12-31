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
    // Create a temporary container for PDF generation
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.height = '297mm'; // A4 height
    tempContainer.style.overflow = 'visible';
    tempContainer.style.background = 'white';
    tempContainer.style.padding = '0';
    tempContainer.style.margin = '0';

    // Clone the element
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '100%';
    clonedElement.style.height = '100%';
    clonedElement.style.maxWidth = 'none';
    clonedElement.style.position = 'relative';
    clonedElement.style.margin = '0';
    clonedElement.style.padding = '0';

    // Add PDF-specific class for styling
    clonedElement.classList.add('pdf-mode');

    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Force layout recalculation
    clonedElement.offsetHeight;

    // Wait for any CSS transitions to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    // Ensure all images are loaded
    await this.waitForImages(clonedElement);

    // Store the temp container for cleanup
    (element as any)._pdfTempContainer = tempContainer;
    (element as any)._pdfClonedElement = clonedElement;
  }

  private cleanupAfterPDF(element: HTMLElement): void {
    // Remove temporary container
    const tempContainer = (element as any)._pdfTempContainer;
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }

    delete (element as any)._pdfTempContainer;
    delete (element as any)._pdfClonedElement;
  }

  private generateFilename(data: BiodataData, options?: PDFOptions): string {
    if (options?.filename) return options.filename;
    
    const name = data.name?.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') || 'Biodata';
    const timestamp = new Date().toISOString().split('T')[0];
    return `${name}_Biodata_${timestamp}.pdf`;
  }

  private async captureElement(element: HTMLElement, options: PDFOptions): Promise<HTMLCanvasElement> {
    // Use the temp container for capturing (it's set to A4 dimensions)
    const tempContainer = (element as any)._pdfTempContainer;

    // Force layout recalculation to get correct dimensions
    tempContainer.offsetHeight;

    const canvas = await html2canvas(tempContainer, {
      scale: Math.min(options.scale, 4), // Lower scale for A4 to avoid memory issues
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      width: tempContainer.offsetWidth,
      height: tempContainer.offsetHeight,
      letterRendering: true,
      imageTimeout: PDF_CONFIG.TIMEOUT,
      logging: false,
      removeContainer: true,
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        // Ignore watermark and other non-essential elements
        return element.classList.contains('watermark') ||
               element.classList.contains('live-preview-only');
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

    // For A4, we want to fill the page completely
    // Scale the canvas to fit A4 dimensions
    const imgWidth = pdfWidth;
    const imgHeight = pdfHeight;

    // Use PNG for better quality with transparency support
    const imgData = canvas.toDataURL('image/png', 1.0);

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
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