const { PDFDocument } = require('pdf-lib');
const { LibreOffice } = require('libreoffice-convert');

exports.handler = async (event) => {
  try {
    const { file, format } = JSON.parse(event.body);
    const pdfDoc = await PDFDocument.load(file);
    
    // Conversion logic using LibreOffice
    const convert = LibreOffice.convert;
    const output = await convert(pdfDoc, format);
    
    return {
      statusCode: 200,
      body: output.toString('base64'),
      headers: {
        'Content-Type': format === 'word' ? 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Conversion failed' })
    };
  }
};