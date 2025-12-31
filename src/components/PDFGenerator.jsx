import { generateBiodataPDF } from '../utils'

const PDFGenerator = ({ data }) => {
  const generatePDF = async () => {
    const button = document.getElementById('pdf-button')
    const originalText = button.textContent

    try {
      button.textContent = 'Generating PDF...'
      button.disabled = true

      const result = await generateBiodataPDF(data)

      if (!result.success) {
        alert(`PDF generation failed: ${result.error}`)
      }
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
