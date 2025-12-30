import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFGenerator = ({ data }) => {
    const generatePDF = async () => {
        const element = document.getElementById('biodata-content');
        if (!element) return;

        try {
            // Show loading state
            const button = document.getElementById('pdf-button');
            const originalText = button.textContent;
            button.textContent = 'Generating PDF...';
            button.disabled = true;

            // Remove watermark for PDF generation
            const watermark = element.querySelector('.watermark');
            if (watermark) {
                watermark.style.display = 'none';
            }

            // Wait a moment for the DOM to update
            await new Promise(resolve => setTimeout(resolve, 100));

            console.log('Element dimensions:', {
                width: element.offsetWidth,
                height: element.offsetHeight,
                scrollWidth: element.scrollWidth,
                scrollHeight: element.scrollHeight
            });

            // Create canvas with optimized settings for quality
            const canvas = await html2canvas(element, {
                scale: 3, // Good balance between quality and performance
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#f8f6f0', // Match the biodata background
                logging: true, // Enable logging for debugging
                width: element.offsetWidth,
                height: element.offsetHeight,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.offsetWidth,
                windowHeight: element.offsetHeight,
                imageTimeout: 15000,
                removeContainer: false,
                foreignObjectRendering: false, // Sometimes causes issues
                letterRendering: true
            });

            console.log('Canvas dimensions:', {
                width: canvas.width,
                height: canvas.height
            });

            // Restore watermark
            if (watermark) {
                watermark.style.display = '';
            }

            // Check if canvas is valid
            if (!canvas || canvas.width === 0 || canvas.height === 0) {
                throw new Error('Canvas generation failed');
            }

            // Convert to high quality PNG
            const imgData = canvas.toDataURL('image/png', 1.0);

            // Create PDF with A4 dimensions
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate dimensions to fit A4 with margins
            const margin = 15;
            const availableWidth = pdfWidth - (2 * margin);
            const availableHeight = pdfHeight - (2 * margin);

            // Calculate scaling to maintain aspect ratio
            const canvasAspectRatio = canvas.width / canvas.height;
            const availableAspectRatio = availableWidth / availableHeight;

            let imgWidth, imgHeight;

            if (canvasAspectRatio > availableAspectRatio) {
                // Canvas is wider relative to available space
                imgWidth = availableWidth;
                imgHeight = availableWidth / canvasAspectRatio;
            } else {
                // Canvas is taller relative to available space
                imgHeight = availableHeight;
                imgWidth = availableHeight * canvasAspectRatio;
            }

            // Center the content on the page
            const x = (pdfWidth - imgWidth) / 2;
            const y = (pdfHeight - imgHeight) / 2;

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, undefined, 'MEDIUM');

            // Generate filename
            const fileName = data.name ?
                `${data.name.replace(/\s+/g, '_')}_Biodata.pdf` :
                'Biodata.pdf';

            // Save the PDF
            pdf.save(fileName);

            // Reset button state
            button.textContent = originalText;
            button.disabled = false;

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');

            // Restore watermark if it was hidden
            const watermark = element?.querySelector('.watermark');
            if (watermark) {
                watermark.style.display = '';
            }

            // Reset button state
            const button = document.getElementById('pdf-button');
            if (button) {
                button.textContent = '📄 Download PDF';
                button.disabled = false;
            }
        }
    };

    return (
        <button
            id="pdf-button"
            onClick={generatePDF}
            className="btn btn-success"
        >
            📄 Download PDF
        </button>
    );
};

export default PDFGenerator;