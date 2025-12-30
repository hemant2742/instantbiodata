import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const PDFGenerator = ({ data }) => {
  const generatePDF = async () => {
    const element = document.getElementById('biodata-content')
    if (!element) return

    const button = document.getElementById('pdf-button')
    const originalText = button.textContent

    try {
      button.textContent = 'Generating PDF...'
      button.disabled = true

      // PDF render mode
      element.classList.add('pdf-mode')

      // Force layout settle
      await new Promise(r => setTimeout(r, 300))

      const canvas = await html2canvas(element, {
        scale: 4,                 // MAX useful DPI (anything above is waste)
        useCORS: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: element.scrollHeight,
        letterRendering: true,    // Improves glyph edges
        imageTimeout: 20000
      })

      element.classList.remove('pdf-mode')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      const imgData = canvas.toDataURL('image/png')

      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      )

      pdf.save(
        data?.name
          ? `${data.name.replace(/\s+/g, '_')}_Biodata.pdf`
          : 'Biodata.pdf'
      )
    } catch (e) {
      console.error(e)
      alert('PDF generation failed')
    } finally {
      button.textContent = originalText
      button.disabled = false
    }
  }

  return (
    <button
      id="pdf-button"
      onClick={generatePDF}
      className="btn btn-success"
    >
      📄 Download PDF
    </button>
  )
}

export default PDFGenerator
