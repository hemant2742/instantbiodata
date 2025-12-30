import React from 'react';
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

            // Create canvas from HTML element
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');

            // Create PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            // Add first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Add additional pages if content is longer than one page
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            // Download the PDF
            const fileName = `${data.name.replace(/\s+/g, '_')}_Biodata.pdf`;
            pdf.save(fileName);

            // Reset button state
            button.textContent = originalText;
            button.disabled = false;
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');

            // Reset button state
            const button = document.getElementById('pdf-button');
            button.textContent = 'Download PDF';
            button.disabled = false;
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